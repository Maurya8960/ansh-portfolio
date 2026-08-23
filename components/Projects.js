const projects = [
  { title: "TrainTrackPro", description: "Full stack railway tracking/booking platform", tech: ["React", "Node.js", "FastAPI", "LangChain", "MongoDB", "Docker"] },
  { title: "AI Agent for Exam Preparation", description: "Gemini-powered study assistant", tech: ["Gemini API", "React", "Node.js"] },
  { title: "Book Data Analysis", description: "Web scraping and sentiment analysis", tech: ["Python", "BeautifulSoup", "Pandas", "TextBlob"] },
  { title: "Inventory Management System", description: "Sales tracking solution", tech: ["React", "Node.js", "MongoDB"] }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
