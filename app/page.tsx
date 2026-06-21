import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Blog } from "@/components/sections/blog"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <section id="hero" data-section={0}>
        <Hero />
      </section>
      <section id="about" data-section={1}>
        <About />
      </section>
      <section id="projects" data-section={2}>
        <Projects />
      </section>
      <section id="skills" data-section={3}>
        <Skills />
      </section>
      <section id="blog" data-section={4}>
        <Blog />
      </section>
      <section id="contact" data-section={5}>
        <Contact />
      </section>
    </>
  )
}
