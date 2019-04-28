//Styles to manage colors of buttoons
let btnEnviar=document.getElementById('send');
btnEnviar.onmouseover= ()=>{    
    btnEnviar.className="mouseOver";
};
btnEnviar.onmouseleave= ()=>{    
    btnEnviar.className="";
};
btnEnviar.onmousedown= ()=>{    
    btnEnviar.className="btnClick";
};
btnEnviar.onmouseup= ()=>{  
    btnEnviar.className="mouseOver";
};