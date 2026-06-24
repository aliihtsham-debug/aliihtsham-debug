import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Blog } from "@/components/sections/blog"
import { Contact } from "@/components/sections/contact"
import { Section3D } from "@/components/sections/section-3d"

export default function Home() {
  return (
    <>
      <Section3D index={0} className="min-h-dvh">
        <section id="hero" data-section={0}>
          <Hero />
        </section>
      </Section3D>
      <Section3D index={1} className="min-h-dvh">
        <section id="about" data-section={1}>
          <About />
        </section>
      </Section3D>
      <Section3D index={2} className="min-h-dvh">
        <section id="projects" data-section={2}>
          <Projects />
        </section>
      </Section3D>
      <Section3D index={3} className="min-h-dvh">
        <section id="skills" data-section={3}>
          <Skills />
        </section>
      </Section3D>
      <Section3D index={4} className="min-h-dvh">
        <section id="blog" data-section={4}>
          <Blog />
        </section>
      </Section3D>
      <Section3D index={5} className="min-h-dvh">
        <section id="contact" data-section={5}>
          <Contact />
        </section>
      </Section3D>
    </>
  )
}
