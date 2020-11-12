function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          src: reader.result,
          width: img.width,
          height: img.height,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file.originFileObj);
  });
}

export default (files) => {
  const promises = [];
  Array.from(files).forEach(file => {
    promises.push(readFile(file));
  });
  return Promise.all(promises);
}