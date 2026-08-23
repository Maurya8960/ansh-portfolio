export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Languages</h3>
            <p>C, C++, JavaScript, Python</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Frontend</h3>
            <p>React.js, HTML5, CSS3, Tailwind CSS, Vite</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Backend</h3>
            <p>Node.js, Express.js, FastAPI, Prisma ORM, REST APIs</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Databases</h3>
            <p>MySQL, PostgreSQL, MongoDB</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Tools</h3>
            <p>Git, GitHub, Docker, Docker Compose, Nginx, VS Code</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">AI/Data</h3>
            <p>Gemini API, LangChain, RAG pipelines, Pandas, NumPy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
