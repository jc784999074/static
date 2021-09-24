const fs = require('fs'); //引用文件系统模块
const imageinfo = require('imageinfo'); //引用imageinfo模

function readFileList(path, filesList) {
	var files = fs.readdirSync(path);
	files.forEach(function (itm, index) {
		var stat = fs.statSync(path + '/' + itm);
		/** stat获取的参数
        dev: 16777224,
        mode: 33188,
        nlink: 1,
        uid: 503,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 4946591,
        size: 7110732,
        blocks: 13896,
        atimeMs: 1632476962812.6423,
        mtimeMs: 1632476961724.8613,
        ctimeMs: 1632476961725.6792,
        birthtimeMs: 1632476961707.6052,
        atime: 2021-09-24T09:49:22.813Z,
        mtime: 2021-09-24T09:49:21.725Z,
        ctime: 2021-09-24T09:49:21.726Z,
        birthtime: 2021-09-24T09:49:21.708Z
     */
		if (stat.isDirectory()) {
			//递归读取文件
			readFileList(path + '/' + itm, filesList);
		} else {
			var obj = {
				size: stat.size, // 大小   bytes
				path, //路径
				filename: itm, //名字
				url: path + '/' + itm, // 完整路径
			};
			filesList.push(obj);
		}
	});
}
const getFiles = {
	//获取文件夹下的所有文件
	getFileList: function (path) {
		var filesList = [];
		readFileList(path, filesList);
		return filesList;
	},
	//获取文件夹下的所有图片
	getImageFiles: function (path) {
		var imageList = [];

		this.getFileList(path).forEach(item => {
			// 使用readFileSync后使用imageinfo无法获取图片的大小，换成readFil就可以，不知道为什么，此处的size使用stat获取了
			var ms = imageinfo(fs.readFileSync(item.url));
			/** imageinfo的参数
       *  type: 'image',
          format: 'JPG',
          mimeType: 'image/jpeg',
          width: 1080,
          height: 1620
       */
			ms.mimeType && imageList.push({ ...item, ...ms });
		});
		return imageList;
	},
};
/**这里的路径是用的是根目录的地址，可能是因为  目录地址以serve.js的位置为基准 */
//获取文件夹下的所有图片
// var imgList = getFiles.getImageFiles('./public/3d/assets/img');
//获取文件夹下的所有文件
// var fileList = getFiles.getFileList('./public/3d/assets/img');
module.exports = getFiles;
