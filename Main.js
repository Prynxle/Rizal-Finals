// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', function() {
	// Slider functionality
	let hero = document.getElementById('hero-slides');
	let menu = document.getElementById('menu');
	let slides = document.getElementById('slides');
	let next = ['next', 'next-catch'].map(n => document.getElementById(n));
	let prev = ['prev', 'prev-catch'].map(n => document.getElementById(n));
	let slideChildren = slides.children;
	let slideCount = slides.children.length;
	let currentPage = 0;

	// Calculate slides per page based on screen width
	function slidesPerPage() {
		if (window.innerWidth > 1700) return 4;
		if (window.innerWidth > 1200) return 3;
		return 2;
	}

	function maxPageCount() {
		return Math.floor((slideCount - 1) / slidesPerPage());
	}

	function updateSlideVisibility() {
		const spp = slidesPerPage();
		const startIdx = currentPage * spp;
		const endIdx = Math.min(startIdx + spp, slideCount);

		// Update prev/next button visibility
		prev.forEach(p => p.style.opacity = currentPage === 0 ? '0.5' : '1');
		next.forEach(n => n.style.opacity = currentPage >= maxPageCount() ? '0.5' : '1');

		// Calculate transform
		const translateX = currentPage * -80;
		slides.style.transform = `translate3D(${translateX}vw, 0, 0)`;
	}

	function goToPage(pageNumber = 0) {
		const maxPage = maxPageCount();
		currentPage = Math.min(maxPage, Math.max(0, pageNumber));
		updateSlideVisibility();
	}

	// Initialize slider navigation
	next.forEach(n => n.addEventListener('click', () => {
		if (currentPage < maxPageCount()) {
			goToPage(currentPage + 1);
		}
	}));

	prev.forEach(p => p.addEventListener('click', () => {
		if (currentPage > 0) {
			goToPage(currentPage - 1);
		}
	}));

	// Drawer Menu Functionality
	const drawer = document.querySelector('.drawer');
	const drawerOverlay = document.querySelector('.drawer-overlay');

	function toggleDrawer(event) {
		if (event) event.stopPropagation();
		menu.classList.toggle('open');
		drawer.classList.toggle('open');
	}

	menu.addEventListener('click', toggleDrawer);
	drawerOverlay.addEventListener('click', toggleDrawer);

	// Popup Functionality
	window.showPopup = function(popupId) {
		const popup = document.getElementById(popupId);
		const content = popup.querySelector('.popup-content');
		
		popup.style.display = 'block';
		document.body.style.overflow = 'hidden';
		
		// Add entrance animation
		content.style.opacity = '0';
		content.style.transform = 'translateY(20px)';
		
		setTimeout(() => {
			content.style.transition = 'all 0.3s ease';
			content.style.opacity = '1';
			content.style.transform = 'translateY(0)';
		}, 50);
	};

	window.closePopup = function(popupId) {
		const popup = document.getElementById(popupId);
		popup.style.display = 'none';
		document.body.style.overflow = 'auto';
	};

	// Close popup when clicking outside
	window.onclick = function(event) {
		if (event.target.classList.contains('popup')) {
			event.target.style.display = 'none';
			document.body.style.overflow = 'auto';
		}
	};

	// Handle keyboard events
	document.addEventListener('keydown', function(e) {
		// Close drawer on Escape
		if (e.key === 'Escape' && drawer.classList.contains('open')) {
			toggleDrawer();
		}
		
		// Close any open popup on Escape
		if (e.key === 'Escape') {
			const popups = document.getElementsByClassName('popup');
			for (let popup of popups) {
				if (popup.style.display === 'block') {
					popup.style.display = 'none';
					document.body.style.overflow = 'auto';
				}
			}
		}

		// Handle arrow key navigation
		if (e.key === 'ArrowLeft' && currentPage > 0) {
			goToPage(currentPage - 1);
		}
		if (e.key === 'ArrowRight' && currentPage < maxPageCount()) {
			goToPage(currentPage + 1);
		}

		// List of keys that cause scrolling
		const scrollKeys = [
			'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
			'PageUp', 'PageDown', 'Home', 'End',
			'Space'
		];
		
		if (scrollKeys.includes(e.key)) {
			e.preventDefault();
		}
	});

	// Handle window resize
	window.addEventListener('resize', function() {
		goToPage(Math.min(currentPage, maxPageCount()));
	});

	// Initialize page
	goToPage(0);

	// Parallax Effect
	const layers = document.querySelectorAll('.parallax-layer');
	
	function moveLayers(e) {
		const x = e.clientX / window.innerWidth;
		const y = e.clientY / window.innerHeight;
		
		layers.forEach((layer, index) => {
			const speed = (index + 1) * 0.1;
			const xMove = (x - 0.5) * speed * 100;
			const yMove = (y - 0.5) * speed * 100;
			
			layer.style.transform = `translate(${xMove}px, ${yMove}px)`;
		});
	}
	
	document.addEventListener('mousemove', moveLayers);
});