import React from "react"; 

function Blogs() {
  return (
    <section className="container mt-28 text-center md:text-left flex flex-col items-center">
      <h2 className="text-4xl font-bold">Contents Strategies</h2>
      <p className="font-medium mt-2">
        We focus on ergonomics and meeting you where you work. It's only a
        keystroke away.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <BlogItem
          imgSrc="images/blog-1.jpg"
          author="Wahid Ari"
          date="03 Mar 2019"
          title="Increasing Prosperity With Positive Thinking"
        />
        <BlogItem
          imgSrc="images/blog-2.jpg"
          author="Niket Singh"
          date="03 Mar 2019"
          title="Motivation Is The First Step To Success"
        />
        <BlogItem
          imgSrc="images/blog-3.jpg"
          author="Divyanshi "
          date="03 Mar 2019"
          title="Success Steps For Your Personal Or Business"
        />
         <BlogItem
          imgSrc="images/blog-4.jpg"
          author="Manhar"
          date="03 Mar 2019"
          title="Business & Personal Growth With Mindfullness"
        />
      </div>

      <button className="primary-button mt-10">View More</button>
    </section>
  );
}

function BlogItem({ imgSrc, author, date, title }) {
  return (
    <div className="border text-left rounded-xl hover:shadow-lg active:shadow-none cursor-pointer hover:scale-105 active:scale-95 transition ">
      <div className="aspect-w-16 aspect-h-9">
        <img className="rounded-t-xl h-full w-full object-cover" src={imgSrc} alt=""/>
      </div>
      <div className="px-4 pt-6 pb-10">
        <p className="text-base">
          By{" "}
          <span className="font-bold hover:text-primary transition ease-out">
            {author}
          </span>{" "}
          | {date}
        </p>
        <h3 className="font-bold text-2xl mt-3 hover:text-primary transition ease-out">
          {title}
        </h3>
      </div>
    </div>
  );
}


export default Blogs;
