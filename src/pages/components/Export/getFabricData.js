function getDataAtIndex(fabric, objList, index) {
  return new Promise((resolve) => {
    objList.forEach(obj => {
      const frameRange = obj._frameRange;
      if (frameRange) {
        if (frameRange[0] - 1 <= index && frameRange[1] - 1 >= index) {
          obj.set('opacity', 1);
        } else {
          obj.set('opacity', 0);
        }
      } else {
        obj.set('opacity', 1);
      }
    });

    setTimeout(() => {
      fabric.renderAll();
      resolve(fabric.toDataURL());
    }, 10);
  });
}

export default (count, fabric, objList) => {
  const result = [];

  function run(resolve, index) {
    getDataAtIndex(fabric, objList, index).then(data => {
      result.push(data);
      if (index >= count) {
        resolve(result);
      } else {
        run(resolve, index + 1);
      }
    });
  }

  return new Promise((resolve) => {
    run(resolve, 0);
  });
}