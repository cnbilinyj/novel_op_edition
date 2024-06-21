if(!bilinyj){
	var bilinyj = {};
}

bilinyj.util = bilinyj.util || {};

bilinyj.util.resolvePath = bilinyj.util.resolvePath || function(path1, path2) {
	// 检查 path1 是否为绝对路径
	if (!path1.startsWith('/')) {
		throw new TypeError('TypeError: Is not the correct absolute path.');
	}

	// 如果 path2 是绝对路径，直接返回
	if (path2.startsWith('/')) {
		return path2;
	}

	// 将绝对路径用 '/' 分割
	let absolutePathArray = path1.split('/');

	// 如果最后一个字符是 '/'，则删除分割数组的最后一个空字符串
	absolutePathArray.pop();

	// 如果第一个字符是 '/'，则删除分割数组的第一个空字符串
	if (absolutePathArray[0] === '') {
		absolutePathArray.shift();
	}

	// 将相对路径用 '/' 分割
	let relativePathArray = path2.split('/');

	// 遍历相对路径数组
	for (let segment of relativePathArray) {
		if (segment === '.') {
			// 如果是当前目录标记 '.'，不做处理
			continue;
		} else if (segment === '..') {
			// 如果是父目录标记 '..'
			if (absolutePathArray.length === 0) {
				throw new TypeError('TypeError: Cannot point to the parent directory of the root directory.');
			}
			// 删除数组最后一个元素
			absolutePathArray.pop();
		} else {
			// 其他情况，添加到绝对路径数组末尾
			absolutePathArray.push(segment);
		}
	}

	// 将结果路径数组重新连接成字符串，并返回
	return '/' + absolutePathArray.join('/');
}
