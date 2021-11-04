let colorsLis = document.querySelectorAll('.colors-list li'),
    randomBackgrounds = document.querySelectorAll('.random-backgrounds span'),
    yesButton = document.querySelector('.random-backgrounds .yes'),
    noButton = document.querySelector('.random-backgrounds .no'),
    skills = document.querySelector('.skills'),
    allimgs = document.querySelectorAll('.images-box img'),
    helpingBullets = document.querySelectorAll('.show-Bullets span'),
    navBullets = document.querySelector('.nav-bullets'),
    showBulletsButton = document.querySelector('.show-Bullets .yes'),
    hideBulletsButton = document.querySelector('.show-Bullets .no'),
    bulletsLocalItem = window.localStorage.getItem('bullets'),
    allBullets = document.querySelectorAll('.nav-bullets .bullet'),
    myIcons = document.querySelectorAll('.settings-box .another-icons i'),
    myLinks = document.querySelectorAll('.landing-page .header-area .links a'),
    landingPage = document.querySelector('.landing-page'),
    imgsArray = document.querySelectorAll('.my-images img'),
    allSkills = document.querySelectorAll('.skill-box .skill-progress span'),
    scrollTop = document.querySelector('.scrollTop'),
    firstSectionHeight = document.querySelector('.landing-page').offsetHeight,
    secondSectionHeight = document.querySelector('.about-us').offsetHeight,
    resetButton = document.querySelector('.reset span'),
    backgroundOption = true,
    backgroundInterval,
    pathsArray = [];

if (window.localStorage.getItem('color')) {
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem('color'));

    document.querySelectorAll('.colors-list li').forEach((list) => {
        list.classList.remove('active');
        if (list.dataset.color == window.localStorage.getItem('color')) {
            list.classList.add('active');
        }
    });
}


document.querySelector('.random-backgrounds .no').classList.remove('disapled');
yesButton.classList.add('disapled');


if (window.localStorage.getItem('background_option') !== null) {
    let backgroundLocal = window.localStorage.getItem('background-option');
    if (backgroundLocal === 'yes') {
        backgroundOption = true;
        remove_put_disapled(noButton, yesButton);
    } else {
        backgroundOption = false;
        remove_put_disapled(yesButton, noButton);
    }

}
/***Start Toggle Settings Box***/
document.querySelector('.toggle-settings .fa-gear').onclick = () => {
    document.querySelector('.settings-box').classList.toggle('open');
    document.querySelector('.settings-box .another-icons').classList.toggle('hidden')
    document.querySelector('.toggle-settings .fa-gear').classList.toggle('fa-spin');

// Important :: if settings box dont have class open ::: Then show the settings options after 200ms (using setTimeout)
    if (! document.querySelector('.settings-box').classList.contains('open')) {
        document.querySelector('.settings-box .settings-container').classList.add('hidden')
    }else{
        setTimeout(() => {
            document.querySelector('.settings-box .settings-container').classList.remove('hidden');
        }, 200);
    }
}



/***Start Colors Change***/
colorsLis.forEach((li) => {
    li.addEventListener('click', function (e) {
        document.documentElement.style.setProperty('--main-color', li.dataset.color);
        window.localStorage.setItem('color', li.dataset.color)
        handleActive(e);
    });
});

/***Random Background options***/
randomBackgrounds.forEach((span) => {
    span.addEventListener('click', (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            if (e.target.classList.contains('disapled')) {
                e.preventDefault();
            } else {
                backgroundOption = true;
                window.localStorage.setItem('background_option', 'yes');
                randomizeImgs();
                remove_put_disapled(noButton, yesButton);
            }
        } else {
            // Stop The Function
            clearInterval(backgroundInterval);
            backgroundOption = false;
            window.localStorage.setItem('background_option', 'no');
            remove_put_disapled(yesButton, noButton);
        }

    });
});

/***Reset Optoins***/
resetButton.addEventListener('click', (e) => {
    window.localStorage.removeItem('color');
    window.localStorage.removeItem('background_option');
    window.localStorage.removeItem('bullets');

    window.location.reload();

    alert('Your Application Options has been reset')
});
/***Start Automatic Slider***/
window.onscroll = function () {
    if (window.scrollY >= firstSectionHeight + secondSectionHeight) {
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress
        });
    }else{
        allSkills.forEach((skill) => {
            skill.style.width = '0px';
        });
    }

    if (window.scrollY > firstSectionHeight) {
        scrollTop.style.display = 'block';
    }else {
        scrollTop.style.display = 'none';
    }

}

/***Scroll Top Button***/
scrollTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
});


/***Images Preview***/
allimgs.forEach((img) => {
    img.addEventListener('click', (e) => {
        // create popup overlay
        let popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        document.body.appendChild(popupOverlay);

        //create popup img
        let popupImg = document.createElement('img');
        popupImg.className = 'popup-img';
        popupImg.src = e.target.src;

        //create close button
        let closeButton = document.createElement('span');
        let spanXinside = document.createTextNode('x');
        closeButton.appendChild(spanXinside);
        closeButton.className = 'close-button';

        //create popup box
        let popupBox = document.createElement('div');
        popupBox.appendChild(closeButton);
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        // make an animation [opacity]
        popupBox.classList.add('popup-box', 'faded-out');
        requestAnimationFrame(() => {
            popupBox.classList.remove("faded-out")
        });
    });
});

document.body.addEventListener('click', function(e) {
    if (e.target.className === 'close-button') {
        e.target.parentElement.remove();
        document.querySelector('.popup-overlay').remove();
    }
})


/***Show And Hide The Helping Bullets***/
if (bulletsLocalItem !== null) {
    if (bulletsLocalItem === 'show') {
        navBullets.style.display = 'block';
        remove_put_disapled(hideBulletsButton, showBulletsButton);
    }else{
        navBullets.style.display = 'none';
        remove_put_disapled(showBulletsButton, hideBulletsButton);
    }
}

helpingBullets.forEach( (bullet) => {
    bullet.addEventListener('click', (e) => {
        if (e.target.dataset.bullet === 'yes') {
            navBullets.style.display = 'block';
            window.localStorage.setItem('bullets', 'show');
            remove_put_disapled(hideBulletsButton, showBulletsButton);
        }else{
            navBullets.style.display = 'none';
            window.localStorage.setItem('bullets', 'hide');
            remove_put_disapled(showBulletsButton, hideBulletsButton);
        }
    })
})

/***toggle the menu***/
let menuBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');

menuBtn.onclick = function() {
    menuBtn.classList.toggle('menu-active');
    links.classList.toggle('open');
}

document.body.addEventListener('click', (e) => {

    if (e.target !== menuBtn && e.target !== links) {
        if (links.classList.contains('open')) {
            menuBtn.classList.toggle('menu-active');
            links.classList.remove('open');
        }
    }

});


links.onclick = function(e) {
    e.stopPropagation();
}



/***My Functions***/
for (let i = 1; i <= imgsArray.length; i++) {
    pathsArray.push(`0${i}.jpg`);
}

function scrollToSomewhere(Elements) {

    Elements.forEach( (element) => {
        element.addEventListener('click', (e) => {
            if (e.target.getAttribute('href')){
                e.preventDefault();
            }
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

};

function randomizeImgs() {

    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
            landingPage.style.backgroundImage = `url(./imgs/${pathsArray[randomNumber]})`
        }, 4000);
    }

}

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll('.colors-list li').forEach((list) => {
        list.classList.remove('active')
    });
    ev.target.classList.add('active');
}

function remove_put_disapled(element1, element2){
    element1.classList.remove('disapled');
    element2.classList.add('disapled');
}

randomizeImgs();
scrollToSomewhere(allBullets);
scrollToSomewhere(myIcons);
scrollToSomewhere(myLinks);


/*************************SETTING BOX FOR MOBILES ONLY **********************/
//Settings Box toggle :
// Open and Close The Setting Box and change spin dynamic rotation...
let settingsBox = document.querySelector(".settings-box2");
document.querySelector(".settings-box2 .toggle-settings2 i").onclick = function () {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
  console.log('opened')
};

//Switch Colors :
let colorOptions = document.querySelectorAll(".colors-list2 li");
colorOptions.forEach((item) => {
  item.addEventListener("click", (e) => {
    // make tha main variable's value === the color of span i click on,
    // then save this color to the local storage.
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);

    // Remove All Active.
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add Active To The Span I Click on
    e.target.classList.add("active");
  });
});


//Switch backgrounds:
const switchBackEl = document.querySelectorAll(".random-backgrounds2 span");
switchBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});


let bulletsSpan = document.querySelectorAll(".bullets-option2 span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullets-option");

if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option2 span.yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option2 .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});


// check if there is an item exist in local storage , and make class active on the span which color is exist in L.S
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}


// Check Local Storage within Background Items: ********
let backgroundLSItem = localStorage.getItem("background-option");

if (backgroundLSItem !== 0) {
  if (backgroundLSItem === "true") {
    backgroundOption = true;
     randomizeImgs();
  } else {
    backgroundOption = false;
      clearInterval(backgroundInterval);
  }

  document.querySelectorAll(".random-backgrounds2 span").forEach((element) => {
    element.classList.remove("active");

    if (backgroundLSItem === "true") {
      document.querySelector(".random-backgrounds2 span.yes").classList.add("active");
    }
    if (backgroundLSItem === "false") {
      document.querySelector(".random-backgrounds2 span.no").classList.add("active");
    }
  });
}

//Reset Button

document.querySelector(".reset2").onclick = function () {
  localStorage.clear();
  window.location.reload();
};



/*************************SETTING BOX FOR MOBILES ONLY **********************/
