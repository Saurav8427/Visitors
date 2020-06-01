var Personcontroller = (function(){

    var Person = function(name, job, company) {
        this.name = name;
        this.job = job;
        this.company = company;
    };

    var data = [];

    return {
        addItem: function(nm, jb, cmp) {
            var newItem;

            newItem = new Person(nm, jb, cmp);
            data.push(newItem);

            return newItem;
        },
        getLength: function() {
            var len = data.length;
            return len;
        },
        testing: function() {
            console.log(data);

        },
    }


})();

var UIcontroller = (function(){

    var DOMstrings = {
        inputName : '.name',
        inputAge : '.age',
        inputJob : '.job',
        inputCompany : '.company',
        inputBtn : '.register',
        inputAdd : '.form-row'
    };

    // var userName = document.querySelector(DOMstrings.inputName).value;
   
    return {
        addListItem: function(obj,len) {
            var html, newHtml, element, diff, diffDark;
            element = DOMstrings.inputAdd;
            diff = "add";
            diffDark = "adddark";

            html = '<div class = %ef%><hr>%no%. %name% had  successfully registered, working as %work% at %company%<hr></div>';
            newHtml = html.replace('%no%', len);
            newHtml = newHtml.replace('%name%', obj.name);
            newHtml = newHtml.replace('%work%', obj.job);
            newHtml = newHtml.replace('%company%', obj.company);
            if(len % 2 !== 0) {
                newHtml = newHtml.replace('%ef%', diff);
            } else {
                newHtml = newHtml.replace('%ef%', diffDark);
            }
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function() {
            document.querySelector(DOMstrings.inputName).value = "";
            document.querySelector(DOMstrings.inputJob).value = "title";
            document.querySelector(DOMstrings.inputCompany).value = "" ;  
        },
        getInput: function() {
            return {
                name : document.querySelector(DOMstrings.inputName).value,
                job: document.querySelector(DOMstrings.inputJob).value,
                company: document.querySelector(DOMstrings.inputCompany).value
                
            };
        },
        getDOMstrings : function(){
            return DOMstrings;
        }
    };

})();

var controller = (function(UICtrl, PerCtrl){

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        
    }

    var ctrlAddItem = function() {

        var input, newItem,len;
        // UICtrl.testing();
        
        // Inputs
        input = UICtrl.getInput();
        // Make object
        newItem = PerCtrl.addItem(input.name, input.job, input.company);
        // Calc length
        len = PerCtrl.getLength();
        // Add it to UI
        UICtrl.addListItem(newItem,len);
        // clear
        UICtrl.clearFields();
    }

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(UIcontroller,Personcontroller);

controller.init();