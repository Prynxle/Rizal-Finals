// Array of page contents
const pages = [
    {
        title: "Education as the Key to Freedom",
        image: "images/rizal1.jpg",
        paragraphs: [
            "Rizal believed that ignorance kept Filipinos oppressed, so he pushed for education as a tool for empowerment.",
            "He founded a school in Dapitan, teaching locals practical skills, science, and arts.",
            "His writings, especially in La Solidaridad, emphasized intellectual independence."
        ]
    },
    {
        title: "His Stand on Revolution vs Reform",
        image: "images/rizal2.png", 
        paragraphs: [
            "Rizal opposed immediate violent revolution, believing Filipinos weren't ready and lacked unity",
            "He advocated for gradual reform through leagal and peaceful means",
            "However, after his exile and seeing continued Spanish abuses, he acknowledged the need for revolution if peaceful means failed"
        ]
    },
    {
        title: "Rizal's Global Perspective",
        image: "images/rizal3.jpg", 
        paragraphs: [
            "Rizal was a polymath who traveled extensively, gaining insights from different cultures and societies.",
            "He learned multiple languages and engaged with intellectual circles across Europe and Asia.",
            "His global experiences informed his vision for Philippine independence and social progress."
        ]
    },
    {
        title: "Rizal and the Youth",
        image: "images/rizal-child.jpg",
        paragraphs: [
            "He famously said, 'The youth is the hope of the nation.' ",
            "Encouraged young Filipinos to pursue education, think critically, and fight for justice.",
            "Believed in leading by example, inspiring future generations to be proactive citizens."
        ]
    }
];

let currentPageIndex = 0;

function updatePage() {
    const currentPage = pages[currentPageIndex];
    

    document.querySelector('h2').textContent = currentPage.title;
    
    // Update image
    document.querySelector('img').src = currentPage.image;
    
    // Update paragraphs
    const paragraphs = document.querySelectorAll('#education p');
    paragraphs.forEach((p, index) => {
        p.textContent = currentPage.paragraphs[index];
    });
}

function nextPage() {
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    updatePage();
}

// event listener to the next button
document.getElementById('next-btn').addEventListener('click', nextPage);

updatePage();