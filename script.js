function uploadImage() {
  var input = document.getElementById('imageInput');
  var resultDiv = document.getElementById('result');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var imageSrc = e.target.result;

      // 调用 OCR 函数
      recognizeText(imageSrc, function (text) {
        // 去除文本中的空格，然后检查是否包含"猫咪王"
        var cleanText = text.replace(/\s/g, ''); // 使用正则表达式去除空格
        var result = cleanText.includes("王") ? "粉丝群794117143，密码是这个题答案：ICE的司机每天早上7点30分到家接他去公司上班，有一天ICE7点从家出发步行去公司，路上遇到按时来接他的车，乘车去公司，结果早到5分钟。请问汽车速度是ICE步行速度的几倍？" : "识别错误，请检查你的截图是否跟例图大小一致/有没有佩戴我的粉丝牌/截图的页面、内容是否和例图一致";
        if( cleanText.includes("ice"))
        {
          result = "粉丝群794117143，密码是这个题答案：ICE的司机每天早上7点30分到家接他去公司上班，有一天ICE7点从家出发步行去公司，路上遇到按时来接他的车，乘车去公司，结果早到5分钟。请问汽车速度是ICE步行速度的几倍？";
        }
        if( cleanText.includes("粉丝勋章墙"))
        {
          result = "粉丝群794117143，密码是这个题答案：ICE的司机每天早上7点30分到家接他去公司上班，有一天ICE7点从家出发步行去公司，路上遇到按时来接他的车，乘车去公司，结果早到5分钟。请问汽车速度是ICE步行速度的几倍？";
        }
        if( cleanText.includes("Icetail_official"))
        {
          result = "作弊都不会？你是猪吗";
        }
          // 输出结果
        resultDiv.innerHTML = "<p>" + result  +"</p>";
      });
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function recognizeText(imageSrc, callback) {
  // 使用 Tesseract.js 进行文字识别，添加中文语言数据文件
  Tesseract.recognize(
    imageSrc,
    'chi_sim', // 语言，这里是中文简体
    { logger: info => console.log(info) } // 可选参数，用于输出日志
  ).then(({ data: { text } }) => {
    callback(text);
  });
}
