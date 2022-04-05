window.onload = function() {
    var card_hash = document.getElementById("user_hash");
    var user_name = document.getElementById("user_name");
    var name_input = document.getElementById("input_name");
    let name_hash = CybozuLabs.MD5.calc(name_input.value, CybozuLabs.MD5.BY_UTF16);
    card_hash.textContent = name_hash;
    user_name.textContent = name_input.value;
    get();
}

window.addEventListener('DOMContentLoaded', function(){
    var input_name = document.getElementById("input_name");
    var form=document.getElementById("mail");
    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    input_name.addEventListener("input",function(){
        var card_hash = document.getElementById("user_hash");
        var user_name=document.getElementById("user_name");
        let name_hash = CybozuLabs.MD5.calc(this.value, CybozuLabs.MD5.BY_UTF16);
        card_hash.textContent = name_hash;
        user_name.textContent = this.value;
        get();
    });
    form.addEventListener("input",function(){
        let formElements = document.forms.contactForm;
        if(pattern.test(form.value)) {
            formElements.submit.disabled = false;
        }else{
            formElements.submit.disabled = true;
        }
    });
});