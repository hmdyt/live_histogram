//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    //開くcsvファイルの指定
    var unko_num = document.getElementById("form1").value;//textformからid指定で取り込み
    var lesson_num = document.form1.lessons.selectedIndex;//プルダウンの数字を取り込み　上から0123...
    var lesson_str = "/static/CSV/" + document.form1.lessons.options[lesson_num].value + ".csv";//選択肢自体の文字をプルダウン配列？から指定して取り込み

    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", lesson_str, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらmakeOutputAnswer()を呼ぶ
    req.onload = function () {
        makeOutputAnswer(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

//答えを表示する文字列を用意する関数
function makeOutputAnswer(str) { // 読み込んだCSVデータが文字列として渡される
    var str = str.replace(/　/g, '\n');//全角スペースを改行コードに変換
    var str = str.replace(/"/g, '');//ダブルクオーテーションを削除
    var tmp = str.split("\n"); // 改行コードが来るごとに分割（apple 名詞 りんご orange 名詞 みかん）
    // 最終的な二次元配列を入れるための配列を初期化する
    var result = [];
    for (var i = 0; i < tmp.length / 3; i++) {
        result[i] = new Array(3).fill(0);
    }

    // 3こずつに分けて二次元配列にする
    for (var i = 0; i < tmp.length; i++) {
        var a = Math.floor(i / 3);
        var b = i % 3;
        result[a][b] = tmp[i];
    }

    //二次元配列をシャッフル
    for (var i = result.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp1 = result[i];
        result[i] = result[r];
        result[r] = tmp1;
    }
    //前の表を消す
    let table = document.getElementById('targetable');
    //テーブルの長さが1になるまで上から２番目の行を消し続ける(良いコード)
    while (table.rows.length != 1) {
        table.deleteRow(1);
    }

    //配列を順番にテーブルに配置する
    let newRow, newCell, newText;

    for (var i = 0; i < result.length; i++) {
        newRow = table.insertRow();

        newCell = newRow.insertCell();
        newText = document.createTextNode(i + 1);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createTextNode(result[i][1]);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createTextNode(result[i][2]);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createTextNode(result[i][0]);
        newCell.appendChild(newText);
    }
    /*原始的なコード(二次元配列から表示する文字列を生成)
        var outputstr_answer ='<tr><th scope="row">1</th><td>'+result[0][0]+"</td><td>"+result[0][1]+"</td><td>"+result[0][2]+"</td></tr>";
        for(var i=1;i<result.length - 1;i++){
            outputstr_answer = outputstr_answer+'<tr><th scope="row">'+(i+1)+"</th><td>"+result[i][0]+"</td><td>"+result[i][1]+"</td><td>"+result[i][2]+"</td></tr>";
        }
        document.getElementById("output_message").innerHTML = outputstr_answer;
    */
}

//列の表示を切り替えるやつ
window.onload = function () {
    var array = ["japanese", "english"];
    for (var j = 0; j < array.length; j++) {
        var id = array[j] + "_display";
        var obj = array[j] + "_check";
        var CELL = document.getElementById(id);
        var TABLE = CELL.parentNode.parentNode.parentNode;
        for (var i = 0; TABLE.rows[i]; i++) {
            TABLE.rows[i].cells[CELL.cellIndex].style.display = (document.getElementById(obj).checked) ? '' : 'none';
        }
    }
}
function checkbox_cell(obj, id) {
    var CELL = document.getElementById(id);
    var TABLE = CELL.parentNode.parentNode.parentNode;
    for (var i = 0; TABLE.rows[i]; i++) {
        TABLE.rows[i].cells[CELL.cellIndex].style.display = (obj.checked) ? '' : 'none';
    }
}
