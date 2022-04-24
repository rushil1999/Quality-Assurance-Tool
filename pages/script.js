function sidebox(){ //onfocus function
	var clss = document.getElementById('passmessage');
	clss.style.display = "block";
	document.getElementById('invalid').style.display='none';
	close();
}

function close() {
	document.getElementById("sidebox").style.width = "450";
  } 


function invalidpassword(){ //onblur function
	var clss = document.getElementById('sidebox');
	clss.style.display = "none";
	if(!passwordrestrictions(document.getElementById('pass').value)){
		document.getElementById('pass').style.background="#ffb5b5";
		document.getElementById('invalid').style.display='block';
	}
	else{
		document.getElementById('pass').style.background="white";
	}
	clss.style.display = "none";
}
function verifyemailerrortext(){
	var email = document.getElementById('email').value;
	var verifyemail = document.getElementById('verifyemail').value;
	if(email!=verifyemail){
		document.getElementById('verifyemail').style.background="#ffb5b5";
		document.getElementById('verifyemailerrortext').style.display='block';
	}else
		{
		document.getElementById('verifyemail').style.background="white";
		document.getElementById('verifyemailerrortext').style.display='none';
		}

}
function passwordrestrictions(){ // oninput function
	document.getElementById('upper').innerHTML="1 upper-case letter";
	document.getElementById('lower').innerHTML="1 lower-case letter";
	document.getElementById('number').innerHTML="1 number";
	document.getElementById('length').innerHTML="7 or more characters";
	document.getElementById('char').innerHTML="Uses only these English characters: A-z, 0-9, !, #, $ and %";
	document.getElementById('same').innerHTML="Your password can not be the same as your user ID.";
	document.getElementById('strong').style.background="white";
	document.getElementById('strong').style.width="0";						

	var clss = document.getElementById('passmessage');
	clss.style.display = "none";
	var clss2 = document.getElementById('sidebox');
	clss2.style.display = "block";

	var password = document.getElementById('pass').value;
	var upper=false, lower=false, number=false, len=false, char=false, same=false;

	for(var i=0;i<password.length;i++){
		var userid = document.getElementById('userid').value;
		var ch = password.charCodeAt(i);
		if(userid.localeCompare(password) == 0) same=true;
		else{
			if(ch>=48 && ch<=57) number=true;
			else if((ch>=97 && ch<=122)) lower=true;
			else if((ch>=65 && ch<=90 )) upper=true;
			else if((ch == 64 || ch == 45 || ch == 95 || ch == 46)){}
			else	char=true;
		}
		if(password.length >= 7 && password.length<=20) len=true;
	}
	if(same || char){
		if(same){
			document.getElementById('same').innerHTML='<span style="color:red;">&#10006;</span>&nbsp;Your password can not be the same as your user ID.';
			document.getElementById('strong').style.background="red";
			document.getElementById('strong').style.width="100%";
		}	
		if(char){		
			document.getElementById('char').innerHTML='<span style="color:red;">&#10006;</span>&nbsp;Use only these characters: A-z, 0-9, @, -, _ and .';
			document.getElementById('strong').style.background="red";
			document.getElementById('strong').style.width="100%";
		}
		return false;
	}
	else{
		var pass=0;
		if(upper){
			document.getElementById('upper').innerHTML='<span style="color:green;">&#10004;</span>&nbsp;1 upper-case letter';
			pass+=25;		
		}
		if(lower){
			document.getElementById('lower').innerHTML='<span style="color:green;">&#10004;</span>&nbsp;1 lower-case letter';
			pass+=25;		
		}
		if(number){
			document.getElementById('number').innerHTML='<span style="color:green;">&#10004;</span>&nbsp;1 number';
			pass+=25;		
		}		
		if(len){
			document.getElementById('length').innerHTML='<span style="color:green;">&#10004;</span>&nbsp;7 or more characters';
			pass+=25;		
		}

		document.getElementById('strong').style.background="green";
		document.getElementById('strong').style.width=pass+"%";		
		if(pass==100){
			document.getElementById('pass').style.background="white";					
			return true;
		}
	}
}

function validatePassword(){ // confirm password field - oninput and onblur function
	var password = document.getElementById('pass').value;
	var p2 = document.getElementById('verifypass').value;

	if(password.localeCompare(p2) == 0 && password != ""){
		document.getElementById('passverifyfail').style.color="green";		
		document.getElementById('passverifyfail').innerHTML="Password Matched.";
		document.getElementById('passverifyfail').style.display="block";
		return true;
	}
	else{
		document.getElementById('passverifyfail').style.color="red";		
		document.getElementById('passverifyfail').innerHTML="Password Doesn't Match.";
		document.getElementById('passverifyfail').style.display="block";
		return false;
	}
}

function cancel(){ // on pressing cancel button
	document.getElementById('userid').value="";
	document.getElementById('pass').value="";
	document.getElementById('verifypass').value="";
	document.getElementById('email').value="";
	document.getElementById('verifyemail').value="";
	document.getElementById('answer1').value="";
	document.getElementById('answer2').value="";
	document.getElementById('mobile').value="";
	document.getElementById('address').value="";
	document.getElementById('inputfield').value="";
	document.getElementById('q1').value="";
	document.getElementById('q2').value="";
	document.getElementById('pass').style.background="white";
	document.getElementById('invalid').style.display='none';
	document.getElementById('passverifyfail').style.display='none';
}

function save(){
	// Save data to sessionStorage
	sessionStorage.setItem('userid', document.getElementById('userid').value);
	console.log("test");
	sessionStorage.setItem('pass', document.getElementById('pass').value);
	sessionStorage.setItem('verifypass', document.getElementById('verifypass').value);
	sessionStorage.setItem('email', document.getElementById('email').value);
	sessionStorage.setItem('verifyemail', document.getElementById('verifyemail').value);
	var q1 = document.getElementById("q1");
	var q1SelectedText = q1.options[q1.selectedIndex].text;
	sessionStorage.setItem('q1', q1SelectedText);
	sessionStorage.setItem('answer1', document.getElementById('answer1').value);
	var q2 = document.getElementById("q2");
	var q2SelectedText = q2.options[q2.selectedIndex].text;
	sessionStorage.setItem('q2', q2SelectedText);
	sessionStorage.setItem('answer2', document.getElementById('answer2').value);
	sessionStorage.setItem('mobile', document.getElementById('mobile').value);
	sessionStorage.setItem('address', document.getElementById('address').value);
	sessionStorage.setItem('address_2', document.getElementById('address_2').value);
	
}


/*function fetchData(){
	document.getElementById('email').value = sessionStorage.getItem("email");
	document.getElementById('verifyemail').value = sessionStorage.getItem("verifyemail");
}*/

function saveform(){ // on pressing submit button
	if(validatePassword() && passwordrestrictions()){
		console.log("test1");
		save();
		cancel();
	}

	var clss = document.getElementById('sidebox');
	clss.style.display = "none";
}