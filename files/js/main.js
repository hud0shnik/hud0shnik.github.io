(function () {
	"use strict";

	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	const onscroll = (el, listener) => {
		el.addEventListener("scroll", listener);
	};

	let navbarlinks = select("#navbar .scrollto", true);
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return;
			let section = select(navbarlink.hash);
			if (!section) return;
			if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
				navbarlink.classList.add("active");
			} else {
				navbarlink.classList.remove("active");
			}
		});
	};

	window.addEventListener("load", navbarlinksActive);
	onscroll(document, navbarlinksActive);

	const scrollto = (el) => {
		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos,
			behavior: "smooth",
		});
	};

	let backtotop = select(".back-to-top");
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add("active");
			} else {
				backtotop.classList.remove("active");
			}
		};
		window.addEventListener("load", toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	on("click", ".mobile-nav-toggle", function (e) {
		select("body").classList.toggle("mobile-nav-active");
		this.classList.toggle("bi-list");
		this.classList.toggle("bi-x");
	});

	on(
		"click",
		".scrollto",
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let body = select("body");
				if (body.classList.contains("mobile-nav-active")) {
					body.classList.remove("mobile-nav-active");
					let navbarToggle = select(".mobile-nav-toggle");
					navbarToggle.classList.toggle("bi-list");
					navbarToggle.classList.toggle("bi-x");
				}
				scrollto(this.hash);
			}
		},
		true
	);

	window.addEventListener("load", () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	const typed = select(".typed");
	if (typed) {
		let typed_strings = typed.getAttribute("data-typed-items");
		typed_strings = typed_strings.split(",");
		new Typed(".typed", {
			strings: typed_strings,
			loop: true,
			typeSpeed: 77,
			backDelay: 1997,
			backSpeed: 57,
		});
	}

	let skilsContent = select(".skills-content");
	if (skilsContent) {
		new Waypoint({
			element: skilsContent,
			offset: "80%",
			handler: function (direction) {
				let progress = select(".progress .progress-bar", true);
				progress.forEach((el) => {
					el.style.width = el.getAttribute("aria-valuenow") + "%";
				});
			},
		});
	}

	window.addEventListener("load", () => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			mirror: false,
		});
	});


	var wheel = document.getElementById('circle')
	var wheelBBox = wheel.getBBox()
	
	var cx = wheelBBox.x + wheelBBox.width / 2
	var cy = wheelBBox.y + + wheelBBox.height / 2
	
	var t0 = Date.now()
	
	setInterval(function() {
	var delta = (Date.now() - t0)
	wheel.setAttribute('transform', 'rotate(-' + delta * 0.04 + ', ' + cx + ', ' + cy + ')')
	}, 10)

	var isNew = false;
	document.getElementById('switch-button').onclick = function () { 
		if (!isNew){
			document.getElementById('theme_css').href = '../files/css/styleNew.css';
			document.title = 'Красивый сайт Дани Егорова | 20 лет принципиальности';
			isNew = true;
		}else{
			document.getElementById('theme_css').href = '../files/css/style.css';
			document.title = 'Сайт Дани Егорова | 20 лет принципиальности';
			isNew = false;
		}
	};
})();
