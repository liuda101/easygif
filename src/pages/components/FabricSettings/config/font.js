const ALL_FONTS = ["Al Bayan","American Typewriter","Andalé Mono","Apple Casual","Apple Chancery","Apple Garamond","Apple Gothic","Apple LiGothic","Apple LiSung","Apple Myungjo","Apple Symbols",".AquaKana","Arial","Arial Hebrew","Ayuthaya","Baghdad","Baskerville","Beijing","BiauKai","Big Caslon","Browallia New","BrowalliaUPC","Brush Script","Candara","Chalkboard","Chalkduster","Charcoal","Charcoal CY","Chicago","Cochin","Comic Sans","Consolas","Cooper","Copperplate","Corsiva Hebrew","Courier","Courier New","DecoType Naskh","Devanagari","Didot","Euphemia UCAS","Futura","Gadget","Geeza Pro","Geezah","Geneva","Geneva CY","Georgia","Gill Sans","Gujarati","Gung Seoche","Gurmukhi","Hangangche","HeadlineA","Hei","Helvetica","Helvetica CY","Helvetica Neue","Herculanum","Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Kaku Gothic Std","Hiragino Kaku Gothic StdN","Hiragino Maru Gothic Pro","Hiragino Maru Gothic ProN","Hiragino Mincho Pro","Hiragino Mincho ProN","Hoefler Text","Inai Mathi","Impact","Jung Gothic","Kai","Keyboard","Krungthep","KufiStandard GK","Kuenstler Script","LastResort","LiHei Pro","LiSong Pro","Lucida Grande","Marker Felt","Menlo","Monaco","Monaco CY","Mshtakan","Nadeem","New Peninim","New York","NISC GB18030","Optima","Osaka","Palatino","Papyrus","PC Myungjo","Pilgiche","PingFang SC","PingFang TC","PingFang HK","Plantagenet Cherokee","Raanana","Sand","Sathu","Seoul","Shin Myungjo Neue","Silom","Skia","Snell Roundhand","Song","ST FangSong","ST Heiti","ST Kaiti","ST Song","Symbol","Tae Graphic","Tahoma","Taipei","Techno","Textile","Thonburi","Times","Times CY","Times New Roman","Trebuchet MS","Verdana","Zapf Chancery","Zapf Dingbats","Zapfino"];

export default [
  {
    key: 'text',
    type: 'input',
    label: 'Content',
    props: {
      placeholder: 'Please input some text',
    }
  },
  {
    key: 'fontSize',
    type: 'slider',
    label: 'Size',
    props: {
      min: 12,
      max: 100,
      step: 1,
    }
  },
  {
    key: 'fill',
    type: 'input',
    label: 'Color',
    props: {
      type: 'color',
    }
  },
  {
    key: 'fontFamily',
    type: 'select',
    label: 'Family',
    props: {
      options: ALL_FONTS.map(f => {
        return {
          label: f,
          value: f
        }
      }),
      showSearch: true,
    }
  },
  {
    key: 'fontWeight',
    type: 'select',
    label: 'Weight',
    props: {
      options: [
        { label: 'Normal', value: 'normal', },
        { label: 'Bold', value: 'bold', }
      ]
    }
  },
  {
    key: 'shadow',
    type: 'shadow',
    label: 'Shadow',
    props: {}
  },
  {
    key: 'fontStyle',
    type: 'radioGroup',
    label: 'Style',
    props: {
      options: [
        { label: 'Normal', value: 'normal', },
        { label: 'Italic', value: 'italic', }
      ],
      optionType: 'button',
      buttonStyle: 'solid',
    }
  },
  {
    key: 'stroke',
    type: 'input',
    label: 'Stroke',
    props: {
      type: 'color',
    }
  },
  {
    key: 'strokeWidth',
    type: 'inputNumber',
    label: 'SWidth',
    props: {
    }
  }
]