const { Outlet, Link, NavLink } = ReactRouterDOM

export function AboutUs() {
	return (
		<section className="about-container">
			<article className="about-main">
				<h3>
					Welcome to Chapter & Verse, your ultimate destination for exploring
					the world of books!
				</h3>
				<p>
					At <b>Chapter & Verse</b>, we believe that every book tells a story,
					and every story has the power to transform lives. Founded by
					passionate bibliophiles, our mission is to connect readers with books
					that inspire, entertain, and educate. Whether you're a lifelong
					bookworm or a curious newcomer, our extensive catalog has something
					for everyone.
				</p>
			</article>
			<article className="about-faq">
				<NavLink to="/about/offer">
					<h5 className="about-offer">
						What We Offer?{" "}
						<img
							className="icon"
							src="/assets/img/icons/arrow-down-sign-to-navigate.png"
							alt="Arrow image"
						/>
					</h5>
				</NavLink>
				<NavLink to="/about/choose">
					<h5 className="about-choose">
						Why Choose Chapter & Verse?{" "}
						<img
							className="icon"
							src="/assets/img/icons/arrow-down-sign-to-navigate.png"
							alt="Arrow image"
						/>
					</h5>
				</NavLink>
				<NavLink to="/about/community">
					<h5 className="about-community">
						Join Our Bookish Community!{" "}
						<img
							className="icon"
							src="/assets/img/icons/arrow-down-sign-to-navigate.png"
							alt="Arrow image"
						/>
					</h5>
				</NavLink>
				<Outlet />
			</article>
			<h5>
				At Chapter & Verse, every page is the start of a new journey. Let us
				help you find yours.
			</h5>
			<h4>Happy Reading! 📚</h4>
		</section>
	)
}
