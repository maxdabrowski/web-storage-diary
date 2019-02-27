document.addEventListener('DOMContentLoaded',init);
function init() {
	const button = document.getElementById("add_button");
        button.addEventListener('click', createNotes);
	let notesArray = localStorage["notesArray"];
	if (!notesArray) {
		notesArray = [];
		localStorage.setItem("notesArray", JSON.stringify(notesArray));
	}
	else {
		notesArray = JSON.parse(notesArray);
	}
	for (let i = 0; i < notesArray.length; i++) {
		let key = notesArray[i];
		let value = localStorage[key];
		addNotesToDOM(key, value); 
	}	
}

function getNotesArray() {
	let notesArray = localStorage.getItem("notesArray");
	if (!notesArray) {
		notesArray = [];
		localStorage.setItem("notesArray", JSON.stringify(notesArray));
	} else {
		notesArray = JSON.parse(notesArray);
	}
	return notesArray;
}

function createNotes() {
	let notesArray = getNotesArray();
        const date = new Date();
	let key = "note_" + date.getTime();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let fullYear = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (day <=9) {
        day = '0' + day;
        }
        if (month <=9) {
            month = '0' + month;
        }
        if (hours <= 9) {
            hours = '0' + hours;
        }
        if (minutes <= 9) {
            minutes = '0' + minutes;
        }
        const dateText = day + " - " + month + " - " + fullYear + " - " + "godz.: " + hours + ":" + minutes;
     
        const text = document.getElementById("diaryMessage").value;
        
        if (text!==''){       
        const value =  "<div class=\"diary-element\">                                        \n\
                            <div class=\"diary-element-bar\">                                \n\
                                <div class=\"diary-element-date\">"+dateText+"</div>         \n\
                                <button class=\"diary-element-delete\" title=\"Usuń wpis\">  \n\
                                    <i class=\"fas fa-trash\"></i>                           \n\
                                </button>                                                    \n\
                            </div>                                                           \n\
                            <div class=\"diary-element-text\">                               \n\
                            "+text+"                                                         \n\
                            </div>                                                           \n\
                        </div>";   
    
	localStorage.setItem(key, value);
	notesArray.push(key);
	localStorage.setItem("notesArray", JSON.stringify(notesArray));
	
	addNotesToDOM(key, value);
}}

function deleteNotes(e) { 
        const diaryList = document.getElementById("diaryList");
        diaryList.addEventListener('click',function(e){
                if (e.target.closest('.diary-element-delete') !== null) {        
                    const key = e.target.closest('.diary-element').parentNode.id;
                    localStorage.removeItem(key);
                    let notesArray = getNotesArray();
                        if (notesArray) {
                            for (let i = 0; i < notesArray.length; i++) {
                               	if (key === notesArray[i]) {
				notesArray.splice(i,1);
			}
		}
                        localStorage.setItem("notesArray", JSON.stringify(notesArray));
                        removeNotesFromDOM(key);
                    }
                }
            });            	 
};


function addNotesToDOM(key, value) { 
	const notes = document.getElementById("diaryList");
        const note = document.createElement("div");
	note.setAttribute("id", key);
        note.setAttribute("class", "diary-note");
        note.innerHTML = value;  
        const first =notes.firstChild;
        notes.insertBefore(note,first);
        note.addEventListener('click',deleteNotes);
}

function removeNotesFromDOM(key) {
	const note = document.getElementById(key);
	note.parentNode.removeChild(note);      
}

