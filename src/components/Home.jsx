import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from '@studio-freight/lenis'
import axios from 'axios';
import LocomotiveScroll from 'locomotive-scroll'

import {
    FiGithub, FiTwitter, FiLinkedin, FiDribbble, FiMail, FiPhone,
    FiMapPin, FiCalendar, FiBook, FiCode, FiUsers, FiLayers, FiCpu,
    FiSun, FiMoon, FiArrowRight, FiExternalLink, FiAward, FiBriefcase,
    FiInstagram, FiMenu, FiX,
} from 'react-icons/fi'
import { FaJava, FaReact, FaDocker, } from 'react-icons/fa'
import { SiSpring, SiMysql, SiMongodb, SiJavascript, SiTailwindcss } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function Home() {
    const [theme, setTheme] = useState('light')
    const [activeTab, setActiveTab] = useState('all')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [guestbookEntries] = useState([
        { id: 1, name: 'Prashant Kumar', message: 'Amazing portfolio! Love the clean design.', date: '2023-05-15' },
        { id: 2, name: 'Gaurav Shaw', message: 'Your work is inspiring. Would love to collaborate sometime.', date: '2023-06-22' },
        { id: 3, name: 'Tripti Sharma', message: 'The attention to detail in your projects is remarkable.', date: '2023-07-10' }
    ])




    // Helper function to add refs to the arrays
    const addToContactItemsRef = (el, index) => {
        if (el && !contactItemsRef.current[index]) {
            contactItemsRef.current[index] = el;
        }
    };

    const addToSocialLinksRef = (el, index) => {
        if (el && !socialLinksRef.current[index]) {
            socialLinksRef.current[index] = el;
        }
    };


    // Use state for githubStats to ensure updates trigger re-render
    const [githubStats, setGithubStats] = useState({
        repos: 24,
        stars: 128,
        commits: 842,
        contributions: 487
    })

    // Refs
    const appRef = useRef()
    const navRef = useRef(null)
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonRef = useRef(null)
    const marqueeRef = useRef(null)
    const aboutRef = useRef(null)
    const aboutImageRef = useRef(null)
    const aboutContentRef = useRef(null)
    const skillsRef = useRef(null)
    const skillBarsRef = useRef([])
    const skillIconsRef = useRef([])
    const projectsRef = useRef([])
    const projectImagesRef = useRef([])
    const contactRef = useRef(null)
    const footerRef = useRef(null)
    const yearRef = useRef(null)
    const statsRef = useRef(null)
    const blogRef = useRef(null)
    const galleryRef = useRef(null)
    const timelineRef = useRef(null)
    const timelineItemsRef = useRef([])
    const guestbookRef = useRef(null)
    const collaborateRef = useRef(null)
    const floatingShapesRef = useRef([])
    const contactInfoRef = useRef([]);
    const socialRef = useRef([]);
    const contactItemsRef = useRef([]); // Array to hold refs for contact items
    const socialLinksRef = useRef([]); // Array to hold refs for social links

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }


    // Testimonial Section
    const cardRefs = useRef([]); // Array to hold refs for each card
    const initialRefs = useRef([]); // Array to hold refs for each initial badge

    // Helper function to add refs to the array if they don't exist
    const addToCardRefs = (el, index) => {
        if (el && !cardRefs.current[index]) {
            cardRefs.current[index] = el;
        }
    };

    const addToInitialRefs = (el, index) => {
        if (el && !initialRefs.current[index]) {
            initialRefs.current[index] = el;
        }
    };

    // Animation setup in useEffect
    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    opacity: 30,
                    y: 100,
                    rotation: index % 2 === 0 ? -15 : 15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        end: 'bottom 20%',
                        scrub: true,
                        onEnter: () => gsap.to(card, { rotation: 0, duration: 5 }),
                        onLeaveBack: () => gsap.to(card, { rotation: index % 2 === 0 ? -15 : 15, duration: 1 })
                    }
                });
            }
        });

        initialRefs.current.forEach((initial) => {
            if (initial) {
                gsap.fromTo(
                    initial,
                    { scale: 0, rotation: 360 },
                    {
                        scale: 1,
                        rotation: 30,
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut'
                    }
                );
            }
        });

        // Animate contact items (fade in with slight slide from right)
        contactItemsRef.current.forEach((item, index) => {
            if (item) {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                        }
                    }
                );
            }
        });

        // Animate social links (scale up with rotation)
        socialLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { scale: 0, rotation: 180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        delay: index * 0.1 + 0.6, // Stagger after contact items
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: link,
                            start: 'top 80%',
                        }
                    }
                );
            }
        });

    }, [guestbookEntries]); // Re-run if guestbookEntries chang

    // Fetch GitHub data
    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Fetch user data for public repos
                const userResponse = await axios.get('https://api.github.com/users/K-Nishant-18')
                const reposCount = userResponse.data.public_repos

                // Fetch repositories to calculate total stars
                const reposResponse = await axios.get('https://api.github.com/users/K-Nishant-18/repos')
                const totalStars = reposResponse.data.reduce((acc, repo) => acc + repo.stargazers_count, 0)

                // Fetch contributions (events API for pushes in the last year)
                const eventsResponse = await axios.get('https://api.github.com/users/K-Nishant-18/events')
                const pushEvents = eventsResponse.data.filter(event => event.type === 'PushEvent')
                const contributions = pushEvents.length // Approximate contributions by counting push events

                // Estimate total commits by summing commits from push events
                let totalCommits = 0
                for (const event of pushEvents) {
                    const repoName = event.repo.name
                    const commitsResponse = await axios.get(`https://api.github.com/repos/${repoName}/commits`, {
                        params: { author: 'K-Nishant-18', per_page: 100 }
                    })
                    totalCommits += commitsResponse.data.length
                }

                setGithubStats({
                    repos: reposCount,
                    stars: totalStars,
                    commits: totalCommits,
                    contributions: contributions
                })
            } catch (error) {
                console.error('Error fetching GitHub data:', error)
                // Fallback to default values if API fails
                setGithubStats({
                    repos: 24,
                    stars: 128,
                    commits: 842,
                    contributions: 487
                })
            }
        }

        fetchGithubData()
    }, [])

    // Projects data - updated with your actual projects
    const projects = [
        {
            title: "Collegia – All-in-one app for students",
            description: "Developed an all-in-one student platform enhancing the student experience with social networking, job board, event management, and productivity tools.",
            tags: ["Java", "Spring MVC", "React.js", "MySQL", "Spring Security"],
            category: "web",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            impact: "Enhanced security 50% with JWT; increased engagement 20% with responsive UI; reduced latency 35%",
            link: "https://github.com/K-Nishant-18/Collegia",
            liveLink: "https://collegia.vercel.app/home"
        },

        {
            title: "The Cultural Circuit",
            description: "Built a cultural heritage platform dedicated to preserving and promoting Indian traditions through blogs, festival coverage, and tour destinations.",
            tags: ["Java", "Spring Boot", "React.js", "MySQL", "JWT"],
            category: "web",
            image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            impact: "Boosted security 30% with JWT; improved API response time 25%; enhanced performance 40% via caching",
            link: "https://github.com/K-Nishant-18/Cultural-circuit",
            liveLink:"https://cultural-circuit.vercel.app/"
        },
        {
            title: "SkillBloom+",
            description: "A comprehensive platform combining structured learning pathways and real-world projects to help learners apply skills in practice. Features include interactive tutorials, real-world project templates, and a skill-based rewards system.",
            tags: ["Spring Boot", "React.js", "MySQL", "JWT", "Docker", "GitHub API"],
            category: "web",
            image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            impact: "Empowered learners to bridge the gap between theory and practice, increasing project submission rates by 30% and user engagement by 25%.",
            link: "https://github.com/K-Nishant-18/SkillBloom",
            liveLink:"https://skill-bloom-kappa.vercel.app/"
        },

    ]

    // Skills data - updated with your skills
    const skills = [
        { name: "Java", level: 90, icon: <FaJava className="w-6 h-6" /> },
        { name: "Spring Boot", level: 85, icon: <SiSpring className="w-6 h-6" /> },
        { name: "React.js", level: 88, icon: <FaReact className="w-6 h-6" /> },
        { name: "JavaScript", level: 85, icon: <SiJavascript className="w-6 h-6" /> },
        { name: "Docker", level: 75, icon: <FaDocker className="w-6 h-6" /> },
        { name: "MySQL", level: 80, icon: <SiMysql className="w-6 h-6" /> },
        { name: "MongoDB", level: 70, icon: <SiMongodb className="w-6 h-6" /> },
        { name: "Tailwind CSS", level: 82, icon: <SiTailwindcss className="w-6 h-6" /> }
    ]

    // Coding stats
    const codingStats = {
        languages: [
            { name: "Java", percent: 45 },
            { name: "JavaScript", percent: 35 },
            { name: "HTML/CSS", percent: 15 },
            { name: "Other", percent: 5 }
        ],
        weeklyHours: 32,
        activeDays: 4.5
    }

    // Blog posts - could be your actual blog if you have one
    const blogPosts = [
        {
            id: 1,
            title: "Optimizing Spring Boot Applications",
            excerpt: "Best practices for improving performance in Java Spring Boot applications.",
            date: "2023-06-15",
            readTime: "6 min",
            link: "#"
        },
        {
            id: 2,
            title: "Building Secure React Applications",
            excerpt: "Implementing JWT authentication and authorization in React apps.",
            date: "2023-05-28",
            readTime: "8 min",
            link: "#"
        },
        {
            id: 3,
            title: "Docker for Full-Stack Developers",
            excerpt: "Streamlining development workflows with Docker containers.",
            date: "2023-04-12",
            readTime: "5 min",
            link: "#"
        }
    ]


    // Gallery images
    const galleryImages = [
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ]


    // Timeline items -  
    const timelineItems = [
        {
            year: "2024 - Present",
            title: "Freelance Full-Stack Dev",
            description: "Building full-stack apps for clients, blending UI/UX with robust backend systems.",
            icon: <FiCode />,

        },
        {
            year: "2024",
            title: "DSA & Problem Solving",
            description: "Solved 150+ problems on LeetCode & GFG, mastering algorithms and optimization.",
            icon: <FiCpu />,

        },
        {
            year: "2023",
            title: "Dev Projects & Learning",
            description: "Developed 5+ projects with React, Spring boot, and databases to solidify skills.",
            icon: <FiLayers />,

        },
        {
            year: "2022",
            title: "B.Tech in CSE",
            description: "Started my CS degree, building core programming and system design fundamentals.",
            icon: <FiBook />,

        }
    ];

    // Floating shapes for background
    const floatingShapes = [
        { type: 'circle', size: 120, x: 10, y: 20, color: 'primary' },
        { type: 'square', size: 80, x: 85, y: 40, color: 'secondary' },
        { type: 'triangle', size: 100, x: 20, y: 70, color: 'accent' },
        { type: 'circle', size: 60, x: 75, y: 15, color: 'primary' },
        { type: 'square', size: 90, x: 15, y: 50, color: 'secondary' },
        { type: 'triangle', size: 70, x: 80, y: 80, color: 'accent' }
    ]

    // Initialize animations
    useEffect(() => {
        // Apply theme class to body
        document.body.className = theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'

        // Set current year
        if (yearRef.current) {
            yearRef.current.textContent = new Date().getFullYear()
        }

        // Smooth scrolling with Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Navigation animation
        gsap.from('.nav-item', {
            y: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        })

        // Hero animations
        const heroTl = gsap.timeline()
        heroTl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        })
            .from(subtitleRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.8')
            .from(buttonRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.6')

        // Marquee animation
        gsap.to(marqueeRef.current, {
            x: '-100%',
            duration: 20,
            repeat: -1,
            ease: 'none'
        })

        // About animations
        gsap.from(aboutImageRef.current, {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top 70%',
            }
        })

        gsap.from(aboutContentRef.current, {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top 70%',
            }
        })

        // Skills animations
        skillIconsRef.current.forEach((icon, index) => {
            gsap.from(icon, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: 'top 80%',
                }
            })
        })

        skillBarsRef.current.forEach((el) => {
            const level = el.dataset.level

            ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(el, {
                        width: `${level}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        onStart: () => {
                            const counter = el.querySelector('.skill-percent')
                            if (counter) {
                                gsap.fromTo(counter,
                                    { textContent: 0 },
                                    {
                                        textContent: level,
                                        duration: 1.5,
                                        snap: { textContent: 1 },
                                        ease: "power3.out"
                                    }
                                )
                            }
                        }
                    })
                }
            })
        })

        // Projects animations
        projectsRef.current.forEach((el, index) => {
            gsap.from(el, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: projectsRef.current[0],
                    start: 'top 80%',
                }
            })
        })

        projectImagesRef.current.forEach((el, index) => {
            gsap.from(el, {
                scale: 1.2,
                opacity: 0,
                duration: 1,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: projectsRef.current[index],
                    start: 'top 80%',
                }
            })
        })

        // Stats animations
        gsap.from('.stat-item', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 70%',
            }
        })

        // Timeline animations
        timelineItemsRef.current.forEach((el, index) => {
            gsap.from(el, {
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.55,
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 70%',
                }
            })
        })

        // Gallery animations
        gsap.from('.gallery-item', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top 70%',
            }
        })

        // Blog animations
        gsap.from('.blog-item', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: blogRef.current,
                start: 'top 70%',
            }
        })

        // Guestbook animations
        gsap.from('.guestbook-entry', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: guestbookRef.current,
                start: 'top 70%',
            }
        })

        // Collaborate animations
        gsap.from(collaborateRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: collaborateRef.current,
                start: 'top 70%',
            }
        })

        // Floating shapes animations
        floatingShapesRef.current.forEach((el, index) => {
            const duration = 20 + Math.random() * 20
            const delay = Math.random() * 5

            gsap.to(el, {
                y: '+=50',
                x: index % 2 === 0 ? '+=30' : '-=30',
                rotation: Math.random() * 360,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            })
        })


        // Contact Info Micro-Animations
        contactInfoRef.current.forEach((el, index) => {
            if (el) {
                gsap.from(el, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: 'top 80%',
                    },
                    ease: 'power2.out'
                });
            }
        });

        // Social Links Micro-Animations
        socialRef.current.forEach((el, index) => {
            if (el) {
                gsap.from(el, {
                    opacity: 0,
                    x: index % 2 === 0 ? 20 : -20,
                    duration: 0.6,
                    delay: index * 0.2 + 0.4,
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: 'top 80%',
                    },
                    ease: 'power2.out'
                });
            }
        });

        gsap.registerPlugin(ScrollTrigger)

        const scrollEl = document.querySelector('[data-scroll-container]')
        if (!scrollEl) {
            console.error('Data-scroll-container not found. Please add [data-scroll-container] to your root div.')
            return
        }

        const scroll = new LocomotiveScroll({
            el: scrollEl,
            smooth: true,
            multiplier: 0.7
        })

        scroll.on('scroll', () => {
            ScrollTrigger.update()
        })

        ScrollTrigger.scrollerProxy(scrollEl, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            pinType: scrollEl.style.transform ? 'transform' : 'fixed'
        })

        // GSAP Animations for Images
        const images = ['pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6']
        images.forEach((id) => {
            const el = window[id]
            if (el) {
                gsap.fromTo(
                    el,
                    { scale: 0.7, opacity: 0, rotation: -5, y: 100 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        y: 0,
                        duration: 1.5,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            end: 'bottom 50%',
                            scrub: 0.5
                        }
                    }
                )
            }
        })

        // Advanced Hover Effect (3D Tilt)
        images.forEach((id) => {
            const el = window[id]
            if (el) {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect()
                    const mouseX = e.clientX - rect.left
                    const mouseY = e.clientY - rect.top
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2
                    const rotateX = (mouseY - centerY) / 20
                    const rotateY = (centerX - mouseX) / 20

                    gsap.to(el, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        scale: 1.1,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                        duration: 0.3,
                        ease: 'power2.out'
                    })
                })

                el.addEventListener('mouseleave', () => {
                    gsap.to(el, {
                        rotationX: 0,
                        rotationY: 0,
                        scale: 1,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        duration: 0.5,
                        ease: 'power2.out'
                    })
                })
            }
        })

        ScrollTrigger.addEventListener('refresh', () => scroll.update())
        ScrollTrigger.refresh()

        return () => {
            lenis.destroy()

        }
    }, [theme])

    // Helper functions
    const addProjectToRefs = (el) => {
        if (el && !projectsRef.current.includes(el)) {
            projectsRef.current.push(el)
        }
    }

    const addProjectImageToRefs = (el) => {
        if (el && !projectImagesRef.current.includes(el)) {
            projectImagesRef.current.push(el)
        }
    }

    const addSkillBarToRefs = (el) => {
        if (el && !skillBarsRef.current.includes(el)) {
            skillBarsRef.current.push(el)
        }
    }

    const addSkillIconToRefs = (el) => {
        if (el && !skillIconsRef.current.includes(el)) {
            skillIconsRef.current.push(el)
        }
    }

    const addTimelineItemToRefs = (el) => {
        if (el && !timelineItemsRef.current.includes(el)) {
            timelineItemsRef.current.push(el)
        }
    }

    const addFloatingShapeToRefs = (el) => {
        if (el && !floatingShapesRef.current.includes(el)) {
            floatingShapesRef.current.push(el)
        }
    }

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(project => project.category === activeTab)



    // Theme classes
    const bgClass = theme === 'dark' ? 'bg-gray-950' : 'bg-grey-50'
    const textClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
    const borderClass = theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
    const cardBgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    // const buttonBgClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    // const hoverButtonClass = theme === 'dark' ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white';
    // const accentClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
    const primaryColor = theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
    const secondaryColor = theme === 'dark' ? 'rgb(100,100,100)' : 'rgb(150,150,150)'
    const accentColor = theme === 'dark' ? 'rgb(200,200,200)' : 'rgb(50,50,50)'

    return (
        <div ref={appRef} className={`relative  ${textClass} overflow-x-hidden`}>
            {/* Floating background shapes */}
            {floatingShapes.map((shape, index) => (
                <div
                    key={index}
                    ref={addFloatingShapeToRefs}
                    className={`absolute -z-10 opacity-10 ${shape.color === 'primary' ? primaryColor : shape.color === 'secondary' ? secondaryColor : accentColor}`}
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        borderRadius: shape.type === 'circle' ? '50%' : '0',
                        clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                    }}
                />
            ))}

            {/* Navigation */}
            {/* Swiss-Inspired Navigation with Your Aesthetic */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full py-4 px-6 md:py-6 md:px-8 flex justify-between items-center z-1000 ${theme === 'dark' ? 'bg-gray-950/80' : 'bg-white/80'
                    } backdrop-blur-sm border-b ${borderClass}`}
            >
                {/* Left-aligned mobile menu button and logo */}
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button - Swiss minimalism, no background */}
                    <button
                        className={`md:hidden !bg-transparent !p-0 !m-0 focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-black'
                            }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                        style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                    >
                        {isMobileMenuOpen ? (
                            <FiX className="w-6 h-6" />
                        ) : (
                            <FiMenu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Logo */}
                    <div className="text-xl pl-4 font-bold tracking-tight hover-scale">
                        <span className={`${theme === 'dark' ? 'text-red-600' : 'text-red-600'} font-[800]`}>K.</span>NISHANT
                    </div>
                </div>

                {/* Right-aligned navigation cluster */}
                <div className="flex items-center space-x-6 md:space-x-8">
                    {/* Desktop navigation - hidden on mobile */}
                    <ul className="hidden md:flex space-x-6 md:space-x-8">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <li key={item} className="nav-item">
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-xs uppercase tracking-wider hover:opacity-80 transition-opacity duration-300 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                        }`}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme toggle - refined but keeping your styling */}
                    <button
                        onClick={toggleTheme}
                        className={`w-12 h-12 rounded-full border transition-all duration-300 flex items-center justify-center shadow ${theme === 'dark'
                            ? 'bg-white text-white hover:bg-gray-200 hover:text-black border-black/10'
                            : 'bg-black text-white hover:bg-gray-800 border-black/10'
                            }`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <FiSun className="w-5 h-5" />
                        ) : (
                            <FiMoon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Mobile menu overlay - Swiss precision */}
                {isMobileMenuOpen && (
                    <div
                        className={`min-h-screen fixed inset-0 z-50000 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'
                            } backdrop-blur-lg`}
                    >
                        <ul className="flex flex-col items-center space-y-10">
                            {['Home', 'About', 'Projects', 'GitHub', 'Resume', 'Contact'].map((item) => (
                                <li key={item} className="nav-item">
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className={`text-xl uppercase tracking-wider ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                            } hover:opacity-80 transition-opacity duration-300`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section
                ref={heroRef}
                id="home"
                className={`min-h-[115vh] md:min-h-[130vh] ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} flex justify-center items-center px-8 md:px-16 lg:px-24 relative overflow-hidden`}
            >
                <div className="relative z-100 flex flex-col md:flex-row items-center justify-between w-full pb-20 md:pb-0">
                    {/* Left/Center: Main Title and Button */}
                    <div className="text-center md:text-left flex flex-col md:flex-col w-full md:w-3/5 mb-10 ">
                        <div>
                            <h1
                                ref={titleRef}
                                className="text-[6rem] md:text-[15rem] lg:text-[19rem] font-[700] leading-none mb-6"
                            >
                                <span className={` ${theme === 'dark' ? 'text-white' : 'text-black'} text-8xl md:text-[8rem] lg:text-[15rem] tracking-[-0.08em]`}>K</span><span className={` ${theme === 'dark' ? 'text-white' : 'text-black'} text-8xl md:text-[6rem] lg:text-[15rem] tracking-[-0.08em]`}>umar</span>
                                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} text-8xl md:text-[8rem] lg:text-[16rem] tracking-[-0.08em] leading-[0.60] pb-14`}>Nishant`</span>
                            </h1>
                        </div>
                        <div className="flex flex-row md:flex-row items-center justify-between w-full pl-3 pr-3 md:pr-10">
                            <div className="mb-6">
                                <p className={`text-sm md:text-base font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                                    Currently
                                </p>
                                <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                    Freelancer at Upwork
                                </p>
                            </div>
                            <div className="mb-6">
                                <p className={`text-sm md:text-base font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                                    Based on
                                </p>
                                <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                    Bhagalpur, India
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Updated Section with Bullet Points */}
                    <div className="relative z-10 flex justify-center md:justify-start mb-[-150px] w-full md:w-2/8 ">
                        <div className="text-center md:text-left">
                            <ul className={`text-xl md:text-2xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                                <li>Web Designer</li>
                                <li>Web Developer</li>
                                <li>Freelancer</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Marquee Section */}
                <div className="absolute bottom-10 left-0 w-full overflow-hidden -translate-y-1/2 rotate-8 md:rotate-6 ">
                    <div ref={marqueeRef} className="flex whitespace-nowrap">
                        <span className={`text-6xl md:text-7xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white/25' : 'text-black/25'} mr-16`}>
                            JAVA · SPRING BOOT · REACT · DOCKER · MYSQL · MONGODB · JWT · SPRING SECURITY · VITE · TAILWIND ·
                        </span>
                        <span className={`text-6xl md:text-7xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white/25' : 'text-black/25'} mr-16`}>
                            JAVA · SPRING BOOT · REACT · DOCKER · MYSQL · MONGODB · JWT · SPRING SECURITY · VITE · TAILWIND ·
                        </span>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                ref={aboutRef}
                id="about"
                className={`min-h-screen  py-10 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row  justify-center gap-16 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}
            >
                <div
                    ref={aboutContentRef}
                    className="w-full mx-auto text-center"
                >
                    <h2 className={`pb-15 text-6xl lg:text-8xl font-[700] uppercase leading-none mb-6 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                        About <span className={`block absolute top-10 left-45/100 md:left-47/100 leading-[.08em] lowercase text-4xl md:text-5xl font-bold   ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(40%)' }}>me</span>
                    </h2>

                    <p className={`px-5 md:px-50 text-xl md:text-3xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                        I'm Kumar Nishant, a passionate full-stack developer with expertise in <span className="font-medium">Java Spring Boot</span> and <span className="font-medium">React.js</span>.
                        My journey in web development focuses on building scalable applications with clean architecture and optimized performance.
                    </p>

                    <p className={`px-5 md:px-50 text-xl md:text-3xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                        {/* Through my projects, I've achieved up to <span className="font-medium">40% performance gains</span> and <span className="font-medium">50% security improvements</span>. */}
                        I'm constantly exploring modern tools like Vite, Tailwind CSS, and AI platforms to create innovative solutions.
                    </p>


                </div>
            </section>

            {/* Skills Section */}
            <section
                ref={skillsRef}
                id="skills"
                className={`pt-30 pb-20 md:pb-40 py-16 px-8 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}
            >
                <div className={`absolute top-0 left-0 w-24 h-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} opacity-100 rotate-45 -translate-x-12 -translate-y-12`}></div>

                <div className="max-w-6xl mx-auto">
                    <div className="mb-22 relative text-right">
                        <h2 className={`text-4xl  md:text-6xl font-bold  tracking-[-0.08em] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                            <span className='caveat-bold'> Technical  </span><span className={`text-7xl lg:text-8xl font-[700] uppercase leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Skills</span>
                        </h2>
                        <p className={`text-right pb-5 text-base md:text-lg mt-2 w-full opacity-70 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Frontend, backend, databases, and DevOps expertise.
                        </p>
                        <div className={`absolute bottom-0 left-80 md:left-0 w-16 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 relative">
                            <h3 className={`text-xl font-bold uppercase mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                Tools
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        ref={addSkillIconToRefs}
                                        className={`p-3 flex flex-col items-center justify-center border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} ${index % 2 === 0 ? 'col-span-2' : 'col-span-1'}`}
                                    >
                                        <div className="mb-1 scale-90">{skill.icon}</div>
                                        <span className={`text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-8 lg:pl-8 relative">
                            <h3 className={`text-xl font-bold uppercase mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                Proficiency
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className={`space-y-1 ${index % 2 === 0 ? 'pl-4' : 'pr-4'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {skill.name}
                                            </span>
                                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className={`w-full h-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                            <div
                                                ref={addSkillBarToRefs}
                                                data-level={skill.level}
                                                className={`h-full ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full`}
                                                style={{ width: '0%' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section
                ref={statsRef}
                id="stats"
                className={`pb-20 md:pb-40 py-16 px-8 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-1 relative pb-24">
                        <h2 className={`text-4xl md:text-6xl font-bold  tracking-[-0.1em] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            <span className={`text-6xl lg:text-8xl uppercase font-[700] leading-none mb-0 md:mb-6 pb-0 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Development</span> <span className={`block caveat-bold text-7xl md:text-[5rem] pl-25 md:pl-0 mb-[-50px]`} style={{ transform: 'translateY(-60%)' }} >numbers</span>
                        </h2>
                        {/* <p className={`text-center md:text-left text-base md:text-lg mt-2 w-full md:w-2/3 opacity-70 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            My coding journey in numbers.
                        </p> */}
                        <div className={`absolute bottom-[70px] right-37 md:right-0 w-20 h-1 mb-[10px] ${theme === 'dark' ? 'bg-white' : 'bg-black/30'}`}></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5 relative">
                            <h3 className={`text-xl font-bold uppercase mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                GitHub Activity
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className={`stat-item p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={githubStats.repos}>{githubStats.repos}</span>
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Repositories
                                    </p>
                                </div>
                                <div className={`stat-item p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={githubStats.stars}>{githubStats.stars}</span>+
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Stars
                                    </p>
                                </div>
                                <div className={`stat-item p-5 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={githubStats.commits}>{githubStats.commits}</span>+
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Commits
                                    </p>
                                </div>
                                <div className={`stat-item p-5 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={githubStats.contributions}>{githubStats.contributions}</span>+
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Contributions
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 lg:pl-8 relative">
                            <h3 className={`text-xl font-bold uppercase mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                Coding Metrics
                            </h3>
                            <div className="mb-6">
                                <h4 className={`text-sm font-medium uppercase mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Languages
                                </h4>
                                <div className="space-y-2">
                                    {codingStats.languages.map((lang, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className={`w-20 text-xs uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {lang.name}
                                            </div>
                                            <div className={`flex-1 h-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                                <div
                                                    className={`h-full ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full`}
                                                    style={{ width: `${lang.percent}%` }}
                                                />
                                            </div>
                                            <div className={`w-8 text-right text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {lang.percent}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`stat-item p-4 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={codingStats.weeklyHours}>{codingStats.weeklyHours}</span>+
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Weekly Hours
                                    </p>
                                </div>
                                <div className={`stat-item p-4 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <span className="counter" data-target={codingStats.activeDays}>{codingStats.activeDays}</span>
                                    </div>
                                    <p className={`text-xs uppercase opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Active Days
                                    </p>
                                </div>
                            </div>
                            <div className={`absolute top-0 right-0 w-12 h-12 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border-b-2 border-r-2`}></div>
                        </div>
                    </div>
                    <div className="mt-26 text-center">
                        <a
                            href="https://medium.com/@me.knishant"
                            className={`text-right inline-block px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full font-medium transition-colors duration-300`}
                        >
                            Visit My GitHub
                        </a>
                    </div>
                </div>
            </section>


            {/* Projects Section */}
            <section
                id="projects"
                className={`py-20 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}
            >
                <div className="max-w-6xl ml-auto">
                    <div className="mb-12 text-right">
                        <h2
                            className={`pb-5 text-8xl lg:text-[12rem] font-[700] tracking-[-0.08em] ${theme === "dark" ? "text-white" : "text-black"
                                }`}
                        >
                            Projects
                        </h2>
                        <p className={`text-lg max-w-2xl opacity-90 ml-auto `} style={{ transform: 'translateY(-20%)' }}>
                            A selection of my recent work.
                        </p>
                    </div>

                    {/* <div className="mb-12 flex flex-wrap gap-2 justify-end">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 py-2 rounded-full text-sm ${activeTab === "all"
                                ? theme === "dark"
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                : theme === "dark"
                                    ? "bg-white/10"
                                    : "bg-black/10"
                                }`}
                        >
                            All Projects
                        </button>
                        {["web", "ai"].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-4 py-2 rounded-full text-sm capitalize ${activeTab === category
                                    ? theme === "dark"
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                    : theme === "dark"
                                        ? "bg-white/10"
                                        : "bg-black/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div> */}

                    <div className="grid grid-cols-1 gap-12">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={index}
                                ref={addProjectToRefs}
                                className={`group relative overflow-hidden rounded-2xl hover-scale transition-transform duration-500 ${cardBgClass} border ${borderClass}`}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="relative h-64 lg:h-auto overflow-hidden">
                                        <img
                                            ref={addProjectImageToRefs}
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover absolute inset-0"
                                        />
                                        <div
                                            className={`absolute inset-0 ${theme === "dark" ? "bg-black/30" : "bg-white/30"
                                                } transition-opacity duration-300 group-hover:opacity-0`}
                                        ></div>
                                    </div>

                                    <div className="p-8 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                            <p className="mb-4 opacity-90">{project.description}</p>
                                            <div className="mb-6">
                                                <h4 className="font-medium mb-2">Impact:</h4>
                                                <p className="text-sm opacity-80">{project.impact}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className={`px-3 py-1.5 ${theme === "dark" ? "bg-white/10" : "bg-black/10"
                                                            } rounded-full text-xs`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className='flex gap-2'>
                                                <div>
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center px-4 py-2 ${theme === "dark"
                                                            ? "bg-white text-black hover:bg-gray-200"
                                                            : "bg-black text-white hover:bg-gray-800"
                                                            } rounded-full text-sm transition-colors duration-300`}
                                                    >
                                                        GitHub <FiExternalLink className="ml-2" />
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center px-4 py-2 ${theme === "dark"
                                                            ? "bg-white text-black hover:bg-gray-200"
                                                            : "bg-black text-white hover:bg-gray-800"
                                                            } rounded-full text-sm transition-colors duration-300`}
                                                    >
                                                        Live Link <FiExternalLink className="ml-2" />
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section
                ref={timelineRef}
                id="timeline"
                className={`py-20 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-0 text-left">
                        <h2 className={`text-6xl lg:text-8xl font-[700]  ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                            <span className='tracking-[-0.08em]'>PROFESSIONAL</span> <span className={`block caveat-bold pl-40 md:pl-50 text-4xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>Journey</span>
                        </h2>

                    </div>

                    <div className="relative">
                        <div className={`absolute left-1/2 h-full w-0.5 -ml-px ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>

                        <div className="space-y-16">
                            {timelineItems.map((item, index) => (
                                <div
                                    key={index}
                                    ref={addTimelineItemToRefs}
                                    className={`relative pl-8 pr-8 md:pl-0 md:pr-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                                >
                                    <div className={`absolute top-0 ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} flex items-center justify-center z-10`}>
                                        {item.icon}
                                    </div>
                                    <div className={`p-6 ${cardBgClass} rounded-lg border ${borderClass}`}>
                                        <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{item.year}</div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="opacity-90">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section
                ref={blogRef}
                id="blog"
                className={`py-20 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-0 text-right">
                        <h2 className={`text-6xl lg:text-8xl font-[700] tracking-[-0.08em] ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                            WEB <span className={`block caveat-bold text-4xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>Journals</span>
                        </h2>
                        <p className={`pb-[-50px] mt-2 text-sm md:text-base font-sans ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} style={{ transform: 'translateY(-250%)' }}>
                            Thoughts on development, design, and technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {blogPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={`blog-item bg-transparent rounded-xl overflow-hidden border ${borderClass} hover-scale transition-transform duration-300`}
                            >
                                <div className={`h-48 flex items-center justify-center  ${theme === 'dark' ? 'transparent' : 'transparent'}`}>
                                    <span className={`text-9xl font-[900] tracking-[-0.08em]  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        {`0${index + 1}`}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className={`text-xs font-mono ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{post.date}</span>
                                        <span className={`text-xs font-mono ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} px-2 py-1 rounded-full`}>{post.readTime} read</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 font-sans ">{post.title}</h3>
                                    <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{post.excerpt}</p>
                                    <a
                                        href={post.link}
                                        className={`inline-flex items-center text-sm font-mono ${theme === 'dark' ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'} transition-colors duration-300`}
                                    >
                                        Read more <FiArrowRight className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* More Blogs Button - Swiss style */}
                    <div className="mt-26 text-center">
                        <a
                            href="https://medium.com/@me.knishant"
                            className={`text-right inline-block px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full font-medium transition-colors duration-300`}
                        >
                            Read more blogs
                        </a>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section
                ref={galleryRef}
                id="gallery"
                className={`py-20 px-6 md:px-12 lg:px-20 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} relative overflow-hidden`}
                data-scroll-section
            >
                <div className="max-w-8xl mx-auto relative z-10">
                    {/* Heading and Tagline */}
                    <div
                        className={`absolute bottom-10 left-[-50px] w-[35%] md:w-[30%] lg:w-[40%] p-6 transform -translate-y-8 translate-x-8 z-50`}
                        data-scroll
                        data-scroll-speed="0.6"
                    >
                        <h2 className={`text-6xl lg:text-[12rem] font-[700] tracking-[-0.08em] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            Gallery
                        </h2>
                    </div>

                    {/* Images Layout */}
                    <div className="relative h-[600px] md:h-[700px] lg:h-[750px]">
                        {/* All images follow this pattern - I'll show one example, apply similarly to others */}
                        {/* Pic-1 (Top Left, Small) */}
                        <div
                            ref={el => (window['pic1'] = el)}
                            className="magic-hover-container absolute top-27 left-27 w-[18%] md:w-[14%] lg:w-[28%] z-20 group"
                            data-scroll
                            data-scroll-speed="1.2"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[0]}
                                        alt="Pic-1"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Pic-2 (Top Center, Medium) */}
                        <div
                            ref={el => (window['pic2'] = el)}
                            className="magic-hover-container absolute top-0 left-[25%] md:left-[20%] lg:left-[23%] w-[25%] md:w-[20%] lg:w-[25%] z-25 group"
                            data-scroll
                            data-scroll-speed="0.9"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[1]}
                                        alt="Pic-2"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Pic-3 (Top Right, Large) */}
                        <div
                            ref={el => (window['pic3'] = el)}
                            className="magic-hover-container absolute top-18 right-18 w-[35%] md:w-[30%] lg:w-[40%] z-15 group"
                            data-scroll
                            data-scroll-speed="1.4"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[2]}
                                        alt="Pic-3"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Pic-4 (Bottom Left, Medium) */}
                        <div
                            ref={el => (window['pic4'] = el)}
                            className="magic-hover-container absolute bottom-0 left-150 w-[30%] md:w-[25%] lg:w-[33%] z-35 group"
                            data-scroll
                            data-scroll-speed="1.1"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[3]}
                                        alt="Pic-4"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Pic-5 (Bottom Right, Small) */}
                        <div
                            ref={el => (window['pic5'] = el)}
                            className="magic-hover-container absolute bottom-50 right-0 w-[20%] md:w-[15%] lg:w-[28%] z-30 group"
                            data-scroll
                            data-scroll-speed="1.3"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[4]}
                                        alt="Pic-5"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Pic-6 (Top Far Left, Tiny) */}
                        <div
                            ref={el => (window['pic6'] = el)}
                            className="magic-hover-container absolute top-0 left-0 w-[12%] md:w-[10%] lg:w-[16%] z-10 group"
                            data-scroll
                            data-scroll-speed="1.5"
                        >
                            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl magic-hover-wrapper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                                <div className="magic-hover-inner overflow-hidden">
                                    <img
                                        src={galleryImages[5]}
                                        alt="Pic-6"
                                        className="w-full h-full object-cover magic-hover-img transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                    <div className="magic-hover-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Parallax Background */}
                        <div
                            className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-2xl`}
                            data-scroll
                            data-scroll-speed="-0.5"
                        ></div>
                        {/* Decorative Accent */}
                        <div
                            className={`absolute -top-[-340px] -left-60 w-90 h-90 rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/10'} animate-pulse-slow`}
                        ></div>
                    </div>
                </div>

                <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-black/1' : 'bg-white/90'}`}></div>


                {/* Advanced CSS Animations */}
                <style jsx global>{`
        .magic-hover-container {
            perspective: 1500px;
            transform-style: preserve-3d;
        }
        
        .magic-hover-wrapper {
            position: relative;
            transform-style: preserve-3d;
            will-change: transform;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .magic-hover-inner {
            position: relative;
            transform-style: preserve-3d;
        }
        
        .magic-hover-img {
            transform: translateZ(0);
            will-change: transform;
            filter: brightness(0.98);
        }
        
        .magic-hover-overlay {
            pointer-events: none;
        }
        
        /* Hover Effects */
        .magic-hover-container:hover {
            z-index: 100 !important;
        }
        
        .magic-hover-container:hover .magic-hover-wrapper {
            transform: 
                translateY(-10px) 
                scale(1.1)
                rotateX(2deg) 
                rotateY(2deg);
            box-shadow: 
                0 25px 50px -12px rgba(0, 0, 0, 0.3),
                0 0 30px rgba(255, 255, 255, 0.1) inset;
        }
        
        .magic-hover-container:hover .magic-hover-img {
            transform: scale(1.08) translateZ(10px);
            filter: brightness(1.05) saturate(1.1);
        }
        
        .magic-hover-container:hover .magic-hover-overlay {
            opacity: 1;
        }
        
        /* Individual Animation Delays */
        .magic-hover-container:nth-child(1):hover .magic-hover-wrapper {
            transition-delay: 0.05s;
        }
        
        .magic-hover-container:nth-child(2):hover .magic-hover-wrapper {
            transition-delay: 0.1s;
        }
        
        /* Subtle Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        
        .magic-hover-container {
            animation: float 6s ease-in-out infinite;
        }
        
        .magic-hover-container:nth-child(2n) {
            animation-delay: 0.5s;
        }
        
        .magic-hover-container:nth-child(3n) {
            animation-delay: 1s;
        }
        
        /* Glow Effect */
        .magic-hover-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            opacity: 0;
            ${theme === 'dark' ?
                        'box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);' :
                        'box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);'}
            transition: opacity 0.4s ease;
            pointer-events: none;
        }
        
        .magic-hover-container:hover .magic-hover-wrapper::after {
            opacity: 1;
        }
    `}</style>
            </section>

            {/* Testimonial Section */}
            <section
                ref={guestbookRef}
                id="guestbook"
                className={`py-26 px-6 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} relative overflow-hidden`}
                data-scroll-section
                style={{
                    backgroundImage: `url('https://media-hosting.imagekit.io/aad8428398174daa/Test_bg-removebg-preview.png?Expires=1840140424&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=vP3kYFgwg8KTTMFf8Y7G5HvEKLrn7CsWwHR4CsZNZ0ki~aLwxML36N5E1prgEbQ5znuocgqAdJrx6kGzOIVArJtrhE78ZymeH7e8JP4AdFddgBMYq947NYcC9nCIRo7jplaD6DKrYMDhzxeb8fTjhc39E6pVFd9h7HDxcuGr88N0syo1Msyy7DVXef9XiW6UrXRnQYQsSOzz8p4jA6x5QQo7LXW5dXmzJ5ky35SVHjzsVc9VihSWgMEr9-kd5o-FWd2ksiybzonR~6nbmm4eFA5ojRwTpmcChaajT~43PAMrMnHqFQYzxs39QrIpshuYQYHlU01zRwNQ26lNHq4TPw__')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'multiply' // or 'multiply', 'screen', etc.
                }}
            >
                {/* Background overlay for better readability */}
                <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-black/1' : 'bg-white/90'}`}></div>

                <div className="min-h-[60vh] max-w-7xl mx-auto relative z-10">
                    {/* Rest of your existing code remains exactly the same */}
                    <div className="mb-0 text-center">
                        <h2 className={`text-6xl lg:text-8xl font-[700] tracking-[-0.08em] ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                            Reflections <span className={`block caveat-bold text-5xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>and Raves</span>
                        </h2>
                        <p className={`pb-[-50px] mt-2 text-sm md:text-base font-sans ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} style={{ transform: 'translateY(-250%)' }}>
                            A glimpse into the moments that mattered.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative" data-scroll data-scroll-speed="5">
                        {guestbookEntries.map((entry, index) => (
                            <div
                                key={entry.id}
                                ref={(el) => addToCardRefs(el, index)}
                                className={`relative p-6 opacity-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-slate-100'} border ${borderClass} rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 perspective-1000`}
                            >
                                <div
                                    ref={(el) => addToInitialRefs(el, index)}
                                    className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center z-10`}
                                >
                                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-800' : 'text-gray-900'}`}>
                                        {entry.name.charAt(0)}
                                    </span>
                                </div>
                                <p className="text-sm md:text-base font-sans leading-relaxed mb-4 opacity-90">
                                    "{entry.message}"
                                </p>
                                <div className="flex justify-between items-end">
                                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {entry.name}
                                    </span>
                                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {new Date(entry.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="absolute -top-20 right-10 w-40 h-40 bg-accent rounded-full opacity-20 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Collaborate Section */}
            <section
                ref={collaborateRef}
                id="collaborate"
                className={`py-20 px-8 pb-0 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} `}
            >
                <div className="w-full mx-auto">
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-[9rem] lg:text-[19rem] font-[700] leading-none mb-6 text-left"
                    >
                        <span className={` ${theme === 'dark' ? 'text-white' : 'text-black'} text-7xl md:text-[8rem] lg:text-[15rem] tracking-[-0.08em]`}>Let's</span>
                        <span className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} text-7xl md:text-[8rem] lg:text-[16rem] tracking-[-0.08em] leading-[0.60] pb-14`}>Collaborate</span>
                    </h1>
                    <div className='text-right'>
                        <p className="text-xl mb-0 opacity-90 text-right">
                            Interested in collaborating on a project?
                        </p>
                        <p className="text-xl mb-8 opacity-90 text-right">
                            I'm available for freelance work and open to new opportunities.
                        </p>
                        <a
                            href="#"
                            className={`text-right inline-block px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full font-medium transition-colors duration-300`}
                        >
                           Contact Me
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                ref={contactRef}
                id="contact"
                className={`py-16 px-6 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}
            >
                <div className="w-full mx-auto flex justify-between">
                    <div className="w-full px-8 ">
                        {/* Header */}
                        <div className="mb-19 md:mb-8  pt-5 text-left">
                            <h2 className={`text-7xl lg:text-8xl font-[700] mt-10 tracking-[-0.05em] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                                Get In <span className={`block pl-15 caveat-bold text-6xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>touch</span>
                            </h2>
                            <p className={`mt-[-70px] text-sm font-sans ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Let’s create something extraordinary.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4 mb-6 text-right relative z-20">
                            <div ref={(el) => addToContactItemsRef(el, 0)} className="flex justify-end items-center space-x-3">
                                <a
                                    href="mailto:me.knishant@gmail.com"
                                    className={`text-xl bold  font-sans ${theme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-black'} transition-colors duration-300`}
                                >
                                    me.knishant@gmail.com
                                </a>
                                <FiMail className={`w-7 h-7 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                            </div>
                            <div ref={(el) => addToContactItemsRef(el, 1)} className="flex justify-end items-center space-x-3">
                                <span className={`text-lg font-sans ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    +91 8986412823
                                </span>
                                <FiPhone className={`w-7 h-7 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                            </div>
                            <div ref={(el) => addToContactItemsRef(el, 2)} className="flex justify-end items-center space-x-3">
                                <span className={`text-lg font-sans ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Bhagalpur, Bihar, India
                                </span>
                                <FiMapPin className={`w-7 h-7 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-end space-x-4 relative z-20">
                            {[
                                { icon: <FiGithub />, link: "https://github.com/K-Nishant-18", label: "GitHub" },
                                { icon: <FiTwitter />, link: "https://x.com/_Nishaant_", label: "Twitter" },
                                { icon: <FiLinkedin />, link: "https://www.linkedin.com/in/kumar-nishant-dev/", label: "LinkedIn" },
                                { icon: <FiInstagram />, link: "https://www.instagram.com/me.nishant_18/", label: "Instagram" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    ref={(el) => addToSocialLinksRef(el, index)}
                                    className={`w-15 h-15 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-black/10 hover:bg-black hover:text-white'} flex items-center justify-center transition-colors duration-300`}
                                >
                                    {social.icon}
                                    <span className="sr-only">{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtle Background Accent */}
                <div className={`absolute top-0 left-0 w-64 h-64 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-full -translate-x-16 translate-y-16`}></div>
                <div className={` bottom-10 mb-[-300px] relative z-10 right-[-1190px] bottom-[340px] w-90 h-90 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-full -translate-x-16 translate-y-16`}></div>

            </section>

            {/* Footer Section */}
            <footer
                ref={footerRef}
                className={`py-12 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} border-t ${borderClass}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-xl font-bold tracking-tight">
                                <span className={`{accentClass} font-[800] text-red-600`}>K.</span>NISHANT
                            </div>

                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-xs hover:opacity-80 transition-opacity duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
                        <p className="text-sm opacity-80 mb-4 md:mb-0">
                            © <span ref={yearRef}>2023</span> K.Nishant. All Rights Reserved.
                        </p>


                    </div>
                </div>
            </footer>
        </div>
    )
}