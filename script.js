// script.js

function uploadImage() {
  var input = document.getElementById('imageInput');
  var resultDiv = document.getElementById('result');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var imageSrc = e.target.result;

      // 调用 OCR 函数
      recognizeText(imageSrc, function (text) {
        resultDiv.innerHTML = "<p>识别结果:</p><p>" + text + "</p>";
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