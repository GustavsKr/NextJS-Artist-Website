# 🎹 Musician Portfolio Website

This is a portfolio website built for a local pianist and composer to showcase her music, biography, and performances. 

The live site is hosted at: **[elzanasharipova.com](https://elzanasharipova.com)**

---

Instead of over-engineering a massive, custom content management system (CMS) with login pages and dashboard code, I used a different approach. The biography text, YouTube performance links, and gallery images are stored directly in a cloud database backend (Supabase). When the client needs to update her copy or swap a video link, she can make the change directly in the database GUI, and the website updates automatically.

Normally for a portfolio website, I would use tools like wordpress or sqarespace which include a simpler CMS for the client that they could use individualy. However I decided to use Next.js in combination with Supabase for two main reasons:

1. I wanted to learn and also showcase that I know how to build a simple website using a modern tech stack.
2. Since the client is a close personal connection, I built the site for free and am happy to maintain it in my free time. Because of this, a full custom CMS wasn't really necessary.

---

### Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Supabase


---

### Potential improvements

* Updated contact page with perhaps an email form
* Higher quality main hero image (Artist needs to organise a photo session with 16:9 aspect ratio photos for clean desktop visibility)
* Section where the artist can sell sheet music pdf files (Not necessary/requested yet)
* External link tree where artist can compile all of their social media and music platform links (Not all music platforms are currently showcased, also would take less space)

---

This project was built using `pnpm`, but you can use `npm` or `yarn` if you prefer. 

To run this project locally, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/GustavsKr/NextJS-Artist-Website.git

# Install dependencies (pnpm preferred, npm should work too)
pnpm install
# or: npm install

# Run the development server
pnpm dev
# or: npm run dev
