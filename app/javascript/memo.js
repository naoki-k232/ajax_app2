function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //フォームの情報を取得し、Ajaxで送信できる形へと整形
    const formData = new FormData(document.getElementById("form"));
    //Ajaxに利用するオブジェクトを生成
    const XHR = new XMLHttpRequest();
    //Ajaxに関する情報を初期化し、エンドポイントなどを設定
    XHR.open("POST", "/posts", true);
    //レスポンスとして求めるデータ形式を指定
    XHR.responseType = "json";
    //Ajaxで送信
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      //メモの入力フォームをリセットする
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      //listという要素に対して、insertAdjacentHTMLでHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      //このコードにより、「メモの入力フォームに入力されたままの文字」はリセット
      formText.value = "";
    };
    e.preventDefault();
  });
 }
 window.addEventListener("load", memo);