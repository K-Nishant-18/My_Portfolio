import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from '@studio-freight/lenis'
import axios from 'axios';
import LocomotiveScroll from 'locomotive-scroll'

import {
    FiGithub, FiTwitter, FiLinkedin, FiDribbble, FiMail, FiPhone,
    FiMapPin, FiCalendar, FiBook, FiCode, FiUsers, FiLayers,
    FiSun, FiMoon, FiArrowRight, FiExternalLink, FiAward, FiBriefcase
} from 'react-icons/fi'
import { FaJava, FaReact, FaDocker } from 'react-icons/fa'
import { SiSpring, SiMysql, SiMongodb, SiJavascript, SiTailwindcss } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function Home() {
    const [theme, setTheme] = useState('light')
    const [activeTab, setActiveTab] = useState('all')

    const [guestbookEntries] = useState([
        { id: 1, name: 'Priya Sharma', message: 'Amazing portfolio! Love the clean design.', date: '2023-05-15' },
        { id: 2, name: 'Rahul Patel', message: 'Your work is inspiring. Would love to collaborate sometime.', date: '2023-06-22' },
        { id: 3, name: 'Anjali Gupta', message: 'The attention to detail in your projects is remarkable.', date: '2023-07-10' }
    ])


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
    const formRef = useRef(null)
    const infoRef = useRef(null)
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
                        end: 'bottom 80%',
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
            link: "#"
        },
        {
            title: "The Cultural Circuit",
            description: "Built a cultural heritage platform dedicated to preserving and promoting Indian traditions through blogs, festival coverage, and tour destinations.",
            tags: ["Java", "Spring Boot", "React.js", "MySQL", "JWT"],
            category: "web",
            image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            impact: "Boosted security 30% with JWT; improved API response time 25%; enhanced performance 40% via caching",
            link: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "web",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            impact: "Increased conversion rate by 28% with optimized UI/UX",
            link: "#"
        },
        {
            title: "AI Content Generator",
            description: "Web application leveraging OpenAI API to generate marketing content and images.",
            tags: ["React", "Python", "OpenAI", "Flask"],
            category: "ai",
            image: "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            impact: "Reduced content creation time by 75% for marketing teams",
            link: "#"
        }
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
        weeklyHours: 42,
        activeDays: 6.2
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


    // Helper function to assign asymmetric grid spans for visual interest
    function getGridSpan(index) {
        const pattern = [
            'col-span-2 row-span-2', // Larger item
            'col-span-1 row-span-1', // Smaller item
            'col-span-1 row-span-1', // Smaller item
            'col-span-2 row-span-1', // Medium item
            'col-span-1 row-span-2', // Tall item
            'col-span-1 row-span-1'  // Smaller item
        ];
        return pattern[index % pattern.length];
    }

    // Gallery images
    const galleryImages = [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ]

    // Timeline items - based on your resume
    const timelineItems = [
        {
            year: "2024 - Present",
            title: "Full-Stack Developer",
            description: "Developing Collegia - an all-in-one student platform with Java Spring Boot and React.js",
            icon: <FiCode />
        },
        {
            year: "2024",
            title: "Project: The Cultural Circuit",
            description: "Built a cultural heritage platform with Spring Boot and React.js",
            icon: <FiBriefcase />
        },
        {
            year: "2023",
            title: "Education",
            description: "Completed B.Tech in Computer Science and Engineering",
            icon: <FiBook />
        }
    ]

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
    const buttonBgClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const hoverButtonClass = theme === 'dark' ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white';
    const accentClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
    const primaryColor = theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
    const secondaryColor = theme === 'dark' ? 'rgb(100,100,100)' : 'rgb(150,150,150)'
    const accentColor = theme === 'dark' ? 'rgb(200,200,200)' : 'rgb(50,50,50)'

    return (
        <div ref={appRef} className={`relative ${bgClass} ${textClass} overflow-x-hidden`}>
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
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full py-6 px-8 flex justify-between items-center z-1000 ${theme === 'dark' ? 'bg-gray-950/80' : 'bg-white/80'} backdrop-blur-sm border-b ${borderClass}`}
            >
                <div className="text-xl font-bold tracking-tight hover-scale">
                    <span className={`{accentClass} font-[800] text-red-600`}>K.</span>NISHANT
                </div>

                <div className="flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                            <li key={item} className="nav-item">
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="text-xs uppercase tracking-wider hover:opacity-80 transition-opacity duration-300"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={toggleTheme}
                        className={`w-13 h-13 rounded-full border transition-all duration-300 flex items-center justify-center shadow
    ${theme === 'dark'
                                ? 'bg-white text-white hover:bg-white hover:text-white border-black/10'
                                : 'bg-black text-white hover:bg-black hover:text-white border-black/10'}
  `}
                    >
                        {theme === 'dark'
                            ? <FiSun className="w-10 h-10 text-inherit" />
                            : <FiMoon className="w-10 h-10 text-inherit" />}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                ref={heroRef}
                id="home"
                className={`min-h-[130vh] flex justify-center items-center px-8 md:px-16 lg:px-24 relative overflow-hidden ${bgClass}`}
            >
                <div className="relative z-100 flex flex-col md:flex-row items-center justify-between w-full pb-0">
                    {/* Left/Center: Main Title and Button */}
                    <div className="text-center md:text-left flex flex-col md:flex-col w-3/5 mb-10 ">
                        <div>
                            <h1
                                ref={titleRef}
                                className="text-6xl md:text-[9rem] lg:text-[19rem] font-[700] leading-none mb-6"
                            >
                                <span className={` ${theme === 'dark' ? 'text-white' : 'text-black'} text-6xl md:text-[8rem] lg:text-[15rem] tracking-[-0.08em]`}>K</span><span className={` ${theme === 'dark' ? 'text-white' : 'text-black'} text-6xl md:text-[6rem] lg:text-[15rem] tracking-[-0.08em]`}>umar</span>
                                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} text-6xl md:text-[8rem] lg:text-[16rem] tracking-[-0.08em] leading-[0.60] pb-14`}>Nishant`</span>
                            </h1>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between w-full pl-3 pr-10">
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
                    <div className="relative z-10 flex justify-start mb-[-150px] w-2/8 ">
                        <div className="text-left">
                            <ul className={`text-lg md:text-2xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                                <li>Web Designer</li>
                                <li>Web Developer</li>
                                <li>Freelancer</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Marquee Section */}
                <div className="absolute bottom-10 left-0 w-full overflow-hidden -translate-y-1/2 rotate-6 ">
                    <div ref={marqueeRef} className="flex whitespace-nowrap">
                        <span className={`text-4xl md:text-6xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white/10' : 'text-black/10'} mr-16`}>
                            JAVA · SPRING BOOT · REACT · DOCKER · MYSQL · MONGODB · JWT · SPRING SECURITY · VITE · TAILWIND ·
                        </span>
                        <span className={`text-4xl md:text-6xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white/10' : 'text-black/10'} mr-16`}>
                            JAVA · SPRING BOOT · REACT · DOCKER · MYSQL · MONGODB · JWT · SPRING SECURITY · VITE · TAILWIND ·
                        </span>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                ref={aboutRef}
                id="about"
                className={`min-h-screen  py-10 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row  justify-center gap-16 ${bgClass}`}
            >
                <div
                    ref={aboutContentRef}
                    className="w-full mx-auto text-center"
                >
                    <h2 className={`text-lg lg:text-8xl font-[700]  tracking-[-0.08em] ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>
                            ABOUT <span className={`block caveat-bold text-4xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>me</span>
                        </h2>

                    <p className={`px-50 text-lg md:text-3xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                        I'm K. Nishant, a passionate full-stack developer with expertise in <span className="font-medium">Java Spring Boot</span> and <span className="font-medium">React.js</span>.
                        My journey in web development focuses on building scalable applications with clean architecture and optimized performance.
                    </p>

                    <p className={`px-50 text-lg md:text-3xl font- uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-950'}`}>
                        Through my projects, I've achieved up to <span className="font-medium">40% performance gains</span> and <span className="font-medium">50% security improvements</span>.
                        I'm constantly exploring modern tools like Vite, Tailwind CSS, and AI platforms to create innovative solutions.
                    </p>


                </div>
            </section>

            {/* Skills Section */}
            <section
                ref={skillsRef}
                id="skills"
                className={`pt-30 pb-50 py-16 px-8 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}
            >
                <div className={`absolute top-0 left-0 w-24 h-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} opacity-100 rotate-45 -translate-x-12 -translate-y-12`}></div>

                <div className="max-w-6xl mx-auto">
                    <div className="mb-22 relative text-right">
                        <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-[-0.08em] ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>
                            Technical <span className={`text-lg lg:text-8xl font-[700] leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Skills</span>
                        </h2>
                        <p className={`text-right text-base md:text-lg mt-2 w-full opacity-70 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Frontend, backend, databases, and DevOps expertise.
                        </p>
                        <div className={`absolute bottom-0 left-0 w-16 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
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
                className={`pb-50 py-16 px-8 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 relative pb-24">
                        <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-[-0.08em] ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>
                            <span className={`text-lg lg:text-8xl font-[700] leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Development</span> Stats
                        </h2>
                        <p className={`text-base md:text-lg mt-2 w-2/3 opacity-70 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            My coding journey in numbers.
                        </p>
                        <div className={`absolute bottom-0 right-0 w-16 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
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
                </div>
            </section>

            {/* Projects Section */}
            <section
                id="projects"
                className={`py-20 px-8 md:px-16 lg:px-24 ${bgClass}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured <span className={accentClass}>Projects</span>
                        </h2>
                        <p className="text-lg max-w-2xl opacity-90">
                            A selection of my recent work showcasing full-stack development expertise.
                        </p>
                    </div>

                    <div className="mb-12 flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-full text-sm ${activeTab === 'all' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : (theme === 'dark' ? 'bg-white/10' : 'bg-black/10')}`}
                        >
                            All Projects
                        </button>
                        {['web', 'ai'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-4 py-2 rounded-full text-sm capitalize ${activeTab === category ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : (theme === 'dark' ? 'bg-white/10' : 'bg-black/10')}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

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
                                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} transition-opacity duration-300 group-hover:opacity-0`}></div>
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
                                                    <span key={i} className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} rounded-full text-xs`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center px-4 py-2 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full text-sm transition-colors duration-300`}
                                            >
                                                View Project <FiExternalLink className="ml-2" />
                                            </a>
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
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Career <span className={accentClass}>Timeline</span>
                        </h2>
                        <p className="text-lg max-w-2xl opacity-80">
                            My professional journey and key milestones.
                        </p>
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
                className={`py-20 px-8 md:px-16 lg:px-24 ${bgClass}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Latest <span className={accentClass}>Articles</span>
                        </h2>
                        <p className="text-lg max-w-2xl opacity-80">
                            Thoughts on development, design, and technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div
                                key={post.id}
                                className={`blog-item ${cardBgClass} rounded-xl overflow-hidden border ${borderClass} hover-scale transition-transform duration-300`}
                            >
                                <div className="h-48 bg-gray-800 overflow-hidden">
                                    <div className={`w-full h-full ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-gradient-to-br from-black/5 to-black/10'}`}></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`text-xs ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{post.date}</span>
                                        <span className={`text-xs ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} px-2 py-1 rounded-full`}>{post.readTime} read</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                                    <p className="mb-4 opacity-90">{post.excerpt}</p>
                                    <a
                                        href={post.link}
                                        className={`inline-flex items-center text-sm ${theme === 'dark' ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'} transition-colors duration-300`}
                                    >
                                        Read more <FiArrowRight className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section
                ref={galleryRef}
                id="gallery"
                className={`py-16 px-6 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}
            >
                <div className="max-w-[1200px] mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight font-sans ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3`}>
                            Design <span className={accentClass}>Gallery</span>
                        </h2>
                        <p className={`text-base font-light tracking-wide font-sans max-w-xl ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Visual inspiration and design explorations.
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className={`gallery-item overflow-hidden ${getGridSpan(index)}`}
                            >
                                <img
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} border`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}

            <section
                ref={guestbookRef}
                id="guestbook"
                className={`py-26 px-6 md:px-12 lg:px-16 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} relative overflow-hidden`}
                data-scroll-section
            >
                <div className="min-h-[70vh] max-w-7xl mx-auto relative z-10">
                    <div className="mb-0 text-center">
                        <h2 className={`text-lg lg:text-8xl font-[700]  tracking-[-0.08em] ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>
                            Reflections <span className={`block caveat-bold text-4xl md:text-7xl font-bold leading-none mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ transform: 'translateY(-70%)' }}>and Raves</span>
                        </h2>
                        <p className={` pb-[-50px] mt-2 text-sm md:text-base font-sans ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} style={{ transform: 'translateY(-250%)' }}>
                            A glimpse into the moments that mattered.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative" data-scroll data-scroll-speed="1">
                        {guestbookEntries.map((entry, index) => (
                            <div
                                key={entry.id}
                                ref={(el) => addToCardRefs(el, index)} // Assign ref to card
                                className={`relative p-6 opacity-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-slate-100'} border ${borderClass} rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 perspective-1000`}
                            >
                                <div
                                    ref={(el) => addToInitialRefs(el, index)} // Assign ref to initial badge
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
                        {/* Crazy Parallax Background */}
                        {/* <div
                className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900/50 to-gray-950/50' : 'bg-gradient-to-br from-white/50 to-gray-50/50'}`}
                data-scroll
                data-scroll-speed="-0.5"
            ></div> */}
                        {/* Pulsing Accent */}
                        <div className="absolute -top-20 right-10 w-40 h-40 bg-accent rounded-full opacity-20 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Collaborate Section */}
            <section
                ref={collaborateRef}
                id="collaborate"
                className={`py-20 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} text-center`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Let's <span className={accentClass}>Collaborate</span>
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Interested in collaborating on a project? I'm available for freelance work and open to new opportunities.
                    </p>
                    <a
                        href="#contact"
                        className={`inline-block px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full font-medium transition-colors duration-300`}
                    >
                        Get In Touch
                    </a>
                </div>
            </section>

            {/* Contact Section */}
            <section
                ref={contactRef}
                id="contact"
                className={`py-20 px-8 md:px-16 lg:px-24 ${bgClass}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In <span className={accentClass}>Touch</span>
                        </h2>
                        <p className="text-lg max-w-2xl opacity-90">
                            Have a project in mind or want to discuss potential opportunities?
                            I'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div ref={formRef} className={`p-8 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-xl border ${borderClass}`}>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full px-4 py-3 bg-transparent border-b ${theme === 'dark' ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'} outline-none transition-colors duration-300`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full px-4 py-3 bg-transparent border-b ${theme === 'dark' ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'} outline-none transition-colors duration-300`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        className={`w-full px-4 py-3 bg-transparent border-b ${theme === 'dark' ? 'border-white/20 focus:border-white' : 'border-black/20 focus:border-black'} outline-none transition-colors duration-300`}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full transition-colors duration-300`}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div ref={infoRef} className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <p className="mb-6 opacity-90">Feel free to reach out through any of these channels:</p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center mr-4`}>
                                            <FiMail className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Email</h4>
                                            <p className="text-sm opacity-80">me.knishant@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center mr-4`}>
                                            <FiPhone className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Phone</h4>
                                            <p className="text-sm opacity-80">+91 8986412823</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center mr-4`}>
                                            <FiMapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Location</h4>
                                            <p className="text-sm opacity-80">Bhagalpur, Bihar, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-black/10 hover:bg-black hover:text-white'} flex items-center justify-center transition-colors duration-300`}
                                    >
                                        <FiGithub className="w-5 h-5" />
                                        <span className="sr-only">GitHub</span>
                                    </a>
                                    <a
                                        href="#"
                                        className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-black/10 hover:bg-black hover:text-white'} flex items-center justify-center transition-colors duration-300`}
                                    >
                                        <FiTwitter className="w-5 h-5" />
                                        <span className="sr-only">Twitter</span>
                                    </a>
                                    <a
                                        href="#"
                                        className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-black/10 hover:bg-black hover:text-white'} flex items-center justify-center transition-colors duration-300`}
                                    >
                                        <FiLinkedin className="w-5 h-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                    <a
                                        href="#"
                                        className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-black/10 hover:bg-black hover:text-white'} flex items-center justify-center transition-colors duration-300`}
                                    >
                                        <FiDribbble className="w-5 h-5" />
                                        <span className="sr-only">Dribbble</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer
                ref={footerRef}
                className={`py-12 px-8 md:px-16 lg:px-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} border-t ${borderClass}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-xl font-bold tracking-tight">
                                <span className={accentClass}>K.</span>NISHANT
                            </div>
                            <p className="mt-2 text-sm opacity-80">
                                Full-Stack Developer specializing in Java Spring Boot and React.js
                            </p>
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
                            © <span ref={yearRef}>2023</span> K. Nishant. All Rights Reserved.
                        </p>


                    </div>
                </div>
            </footer>
        </div>
    )
}