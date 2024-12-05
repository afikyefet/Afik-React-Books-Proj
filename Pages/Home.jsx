const { useState, useEffect } = React

export function Home() {
	return (
		<section className="home">
			<div className="hero-container">
				<h2 className="hero-title">
					Welcomee to Chapter & Verse, your ultimate destination for exploring
					the world of books!
				</h2>
				<h5 className="hero-subtitle">
					At Chapter & Verse, we believe that every book tells a story, and
					every story has the power to transform lives. Founded by passionate
					bibliophiles, our mission is to connect readers with books that
					inspire, entertain, and educate. Whether you're a lifelong bookworm or
					a curious newcomer, our extensive catalog has something for everyone.
				</h5>
				<img
					className="hero-img"
					src="./assets/img/Hero photo books.webp"
					alt="photo of books"
				/>
			</div>
		</section>
	)
}
