window.onload = function(){
  var addbutton = document.getElementById('addbut');
  var text = document.getElementById('inptext');
  var list = document.getElementById('todolist');
  var clearbutton = document.getElementById('clearbutton');
  var todos = [];
  var obj;
  var counter;
  class objclass {
    constructor(checkedornot, data, counter) {
      this.checkedornot = checkedornot;
      this.data = data;
      this.counter = counter;
    }
  }
  if(localStorage.getItem('cntr') == null){
    localStorage.setItem('cntr', 1);
    counter = localStorage.getItem('cntr').toString();
  }
  counter = localStorage.getItem('cntr').toString();
  console.log(counter);
  addbutton.onclick = function(){
    obj = new objclass(false, text.value.toString(), counter);
    list.innerHTML += '<li id="count' + counter.toString() + '"class="listitem" onclick="setstrinke(this)"><input id="count' + counter.toString() + '" class="ckbox" type="checkbox">' + text.value.toString() + '</li>';
    todos.push(obj);
    console.log(todos);
    text.value = "";
    savetodo();
    ++counter;
    localStorage.setItem("cntr", counter);
    console.log(counter);
  }
  setstrinke = function(s){
    s.setAttribute('style' , 'text-decoration: line-through;');
    deleter(s);
    savetodo();
    console.log(todos);
  }
  deleter = function(s){
    var t;
    for(var i = 0; i < todos.length; i++){
      if('count' + todos[i].counter.toString() === s.id.toString()){
        t = i;
        break;
      }
    }
    (todos[i].checkedornot === true)?(todos[i].checkedornot = false):(todos[i].checkedornot = true);
  }
  savetodo = function(){
    localStorage.setItem("ToDo", JSON.stringify(todos));
  }
  savecounter = function(counter){
    localStorage.setItem("cntr", counter++);
  }
  chkr = function(todos, i){
    var str = "checked";
    var str0 = "notchecked";
    if(todos[i].checkedornot.toString() === 'true'){
      console.log(str);
      return str;
    }
    else {
      console.log(str0);
      return str0;
    }
  }
  showtodos = function(){
    var a = "";
    if(localStorage.getItem("ToDo") != null){
      todos = JSON.parse(localStorage.getItem("ToDo"));
      for(var i = 0; i < todos.length; i++){
        a += '<li id="count' + todos[i].counter.toString() + '" class="listitem" onclick="setstrinke(this)"><input ' + chkr(todos, i) + ' id="count' + todos[i].counter.toString() + '" class="ckbox" type="checkbox">' + todos[i].data.toString() + '</li>';
      }
      list.innerHTML = a.toString();
    }
  }
  clearbutton.onclick = function(){
    for(var i = 0; i < todos.length; i++){
      if(todos[i].checkedornot.toString() === 'true'){
        todos.splice(i, 1);
      }
    }
    localStorage.removeItem("ToDo");
    savetodo();
    showtodos();
    console.log(todos);
  }
  showtodos();
}
