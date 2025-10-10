// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    let footerTop = footer.offsetTop;

    if (window.scrollY + window.innerHeight >= footerTop - 100) {
        navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*="contact"]').classList.add('active');
        });
    }

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('zcalModal');
    const iframe = document.getElementById('zcalIframe');
    const closeBtn = document.getElementById('closeZcal');

    // Only enhance if modal exists (JavaScript is working)
    if (modal) {
        // When any .open-zcal is clicked
        document.querySelectorAll('.open-zcal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // If it's a link, prevent default behavior
                if (btn.tagName === 'A') {
                    e.preventDefault();
                }
                
                const link = btn.getAttribute('data-zcal');
                iframe.src = link;
                modal.style.display = 'flex';
            });
        });

        // Close modal function
        const closeModal = () => {
            modal.style.display = 'none';
            iframe.src = ''; // stop the session
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { 
            if (e.target === modal) closeModal(); 
        });
        document.addEventListener('keydown', e => { 
            if (e.key === 'Escape') closeModal(); 
        });
    }
});
