
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"

export function RootCmp() {
    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Home />
            </main>
        </section>
    )
}