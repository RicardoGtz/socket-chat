let btnEnviar=document.getElementById('send');

btnEnviar.onmouseover= ()=>{
    //this.className="btnClick";
    btnEnviar.className="mouseOver";
};
btnEnviar.onmouseleave= ()=>{
    //this.className="btnClick";
    btnEnviar.className="";
};
btnEnviar.onmousedown= ()=>{
    //this.className="btnClick";
    btnEnviar.className="btnClick";
};
btnEnviar.onmouseup= ()=>{
    //this.className="btnClick";
    btnEnviar.className="mouseOver";
};