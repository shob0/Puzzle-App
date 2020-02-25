(function() {
  var serviceArray = {
      OutStanding: "20",
      Good: "12",
      Okay: "10",
      Bad: "8",
      Terrible: "5"
    },
    billAmount = 0,
    serviceQuality,
    numberErrorMsg = "Please enter a number.",
    numberOfPeople = 1;

  function init() {
    renderTipWindow();
  }

  function renderTipWindow() {
    var tipElement = document.createElement("div");
    tipElement.className = "tip-div";
    renderHeader(tipElement);
    renderCalculator(tipElement);
    document.body.appendChild(tipElement);
  }

  function renderHeader(baseElement) {
    var e = document.createElement("div");
    e.className = "tip-div-header";
    e.innerHTML = `<p>Tip Calculator</p>`;
    baseElement.appendChild(e);
  }

  function renderCalculator(baseElement) {
    var be = document.createElement("div");
    be.className = "tip-calcultor";
    be.id = "tip-calculate";
    // build bill text input
    (function() {
      var b = document.createElement("div");
      b.id = "bill-input-div";
      var t = document.createElement("p");
      t.innerHTML = "How much was your bill?";
      b.append(t);
      //Adding a dollar sign before
      b.append("$  ");
      // Bill input tag
      var i = document.createElement("INPUT");
      i.setAttribute("type", "text");
      i.setAttribute("placeholder", "Bill Amount");
      i.addEventListener("change", handleBillInput);
      b.append(i);

      be.appendChild(b);
    })();
    //Service text input
    (function() {
      var d = document.createElement("div");
      var t = document.createElement("p");
      t.innerHTML = "How was the service?";
      d.append(t);

      var s = document.createElement("SELECT");
      s.classList = "select-service";

      var opd = document.createElement("option");
      opd.text = "--Select An Option--";
      opd.value = undefined;
      s.appendChild(opd);

      s.addEventListener("change", handleServiceInput);

      for (var t in serviceArray) {
        var op = document.createElement("option");
        op.text = t;
        op.value = t;
        opd.disabled = true;
        s.appendChild(op);
      }
      d.append(s);

      be.appendChild(d);
    })();

    //Number of people sharing the bill

    (function() {
      var d = document.createElement("div");
      d.id = "people-number-div";
      var t = document.createElement("p");
      t.innerHTML = "How many people are sharing the bill?";
      d.append(t);
      d.append("#  ");

      var i = document.createElement("INPUT");
      i.setAttribute("TYPE", "TEXT");
      i.setAttribute("placeholder", "Number of people.");
      i.addEventListener("change", handlerNUmberPeople);
      d.append(i);

      be.appendChild(d);
    })();

    //Add calculate button
    (function() {
      var d = document.createElement("div"),
        b = document.createElement("button");
      d.className = "calculate-btn-div";
      b.className = "calculate-btn";
      b.innerText = "Calculate";
      b.addEventListener("click", calculateTip);
      d.appendChild(b);
      be.appendChild(d);
    })();

    (function() {
      var d = document.createElement("div");
      var e = document.createElement("p");
      d.id = "total-tip";
      d.style.fontWeight = "bold";
      d.style.fontSize = "20px";
      e.innerText = `Tip Amount`;
      d.appendChild(e);
      be.appendChild(d)
    })();
    baseElement.appendChild(be);
  }

  function validateInput(i) {
    return !isNaN(i);
  }

  function handleBillInput(event) {
    var errorEle = addText(
      document.getElementById("bill-input-div"),
      numberErrorMsg
    );
    if (validateInput(event.target.value)) {
      errorEle.style.visibility = "hidden";
      billAmount = event.target.value;
    } else {
      errorEle.style.visibility = "visible";
      //   return;
    }
  }

  function handleServiceInput(event) {
    serviceQuality = event.target.value;
  }

  function handlerNUmberPeople(event) {
    var errorEle = addText(
      document.getElementById("people-number-div"),
      numberErrorMsg
    );
    if (validateInput(event.target.value)) {
      errorEle.style.visibility = "hidden";
      numberOfPeople = event.target.value;
    } else {
      errorEle.style.visibility = "visible";
      //   return;
    }
  }

  function addText(element, text) {
    var ed = document.getElementById("error-text-people");
    if (ed) {
      return ed;
    }
    var t = document.createElement("span");
    t.style.visibility = "hidden";
    t.id = "error-text-people";
    t.style.color = "red";
    t.innerText = text;
    element.appendChild(t);
    return t;
  }

  function calculateTip() {
    if (billAmount === 0) {
      alert("Please Enter Bill Amount.");
      return;
    }
    if (serviceQuality === undefined) {
      alert("Select quality.");
      return;
    }
    if (numberOfPeople === 1) {
      alert("Default 1 number of person will be taken. Please click ok.");
    }

    sq = serviceArray[serviceQuality];
    var total = (billAmount * sq) / 100;
    renderTip(total);
  }

  function renderTip(tip) {
    var a = document.createElement("p");
    a.innerText = tip + "$ Each";

    document.getElementById('total-tip').append(a);
  }

  window.onload = function() {
    init();
  };
})();
