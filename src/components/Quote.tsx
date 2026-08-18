import ScrollReveal from "./ScrollReveal";

export default function Quote() {
  return (
    <section className="tinted">
      <div className="wrap">
        <span className="stamp">FROM THE FRONT DESK</span>
        <ScrollReveal className="quote">
          <div className="mark" aria-hidden="true">
            &ldquo;
          </div>
          <div>
            <blockquote>
              I used to walk the rooms with a printout during pickup rush. Now I
              glance at one screen and know exactly who&rsquo;s still here.
            </blockquote>
            <cite>Center director, placeholder quote</cite>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
