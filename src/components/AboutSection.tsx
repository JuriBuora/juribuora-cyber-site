import { Target, Eye, BookOpen, MessageSquare } from "lucide-react";

const items = [
  { icon: Target, title: "The Goal", text: "A junior role in Linux / IT operations, automation or security, supported by systems I can explain and evidence I can show." },
  { icon: Eye, title: "The Approach", text: "Foundations first, hands-on labs, rigorous documentation, understanding flows over memorizing definitions." },
  { icon: BookOpen, title: "What You'll Find", text: "Selected Linux and automation projects, security reports and a daily learning diary. AI-assisted development, with my role and the limits made explicit." },
  { icon: MessageSquare, title: "Feedback Welcome", text: "Bad assumptions? Weak mental models? Corrections are welcome — better early than confidently wrong later." },
];

const AboutSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h2 className="font-mono text-xs text-terminal-dim uppercase tracking-widest mb-8 text-center">
        About This Project
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-border rounded-lg p-5 bg-card"
          >
            <item.icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold text-card-foreground mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
