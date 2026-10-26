import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBox,
  FiCheck,
  FiLayers,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";
import "./Login.css";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-layout">
      <section className="auth-story">
        <Link className="brand auth-brand" to="/login">
          <span className="brand-mark">
            e<span>×</span>
          </span>
          <span>
            extreme<span className="brand-caption">COMMERCE STUDIO</span>
          </span>
        </Link>
        <div className="story-content">
          <div className="story-eyebrow">
            <span /> BUILT FOR YOUR NEXT CHAPTER
          </div>
          <h1>
            Good style.
            <br />
            Great business.
            <br />
            <span>All in one place.</span>
          </h1>
          <p>
            A clearer view of your store. More room for what’s next.
            <br className="desktop-break" /> Your everyday workspace for
            extraordinary things.
          </p>
          <div className="story-illustration" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="story-spark">✳</span>
            <div className="illustration-card">
              <div className="illustration-card-top">
                <span>
                  <FiShoppingBag /> THE COLLECTION
                </span>
                <FiArrowUpRight />
              </div>
              <div className="shirt-scene">
                <svg viewBox="0 0 200 180" fill="none">
                  <path
                    d="M68 24 35 38 9 80l35 19 13-21v84h86V78l13 21 35-19-26-42-33-14c-5 20-59 20-64 0Z"
                    fill="#e2e8ca"
                    stroke="#c8d2ad"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M68 24c5 25 59 25 64 0M57 55v23m86-23v23M57 153h86"
                    stroke="#bac69f"
                    strokeWidth="2"
                  />
                  <path
                    d="M92 47v85M100 47v85M108 47v85"
                    stroke="#d5ddba"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="product-tag">
                  EXTREME
                  <br />
                  <small>ESSENTIALS</small>
                </span>
              </div>
              <div className="illustration-card-bottom">
                <span>
                  Everyday essentials<small>Thoughtfully curated.</small>
                </span>
                <span className="mini-arrow">
                  <FiArrowUpRight />
                </span>
              </div>
            </div>
            <div className="floating-label floating-stock">
              <span>
                <FiLayers />
              </span>
              <div>
                Beautifully organized
                <small>Every piece. Every possibility.</small>
              </div>
            </div>
            <div className="floating-label floating-ready">
              <span>
                <FiCheck />
              </span>
              Ready for what’s next
            </div>
            <span className="illustration-caption">
              A FRESH PERSPECTIVE ON EVERYDAY COMMERCE
            </span>
          </div>
        </div>
        <div className="story-footer">
          <span>
            <FiBox /> Your store. Your next chapter.
          </span>
          <span>EST. FOR THE EVERYDAY</span>
        </div>
      </section>
      <section className="auth-form-side">
        <div className="auth-topnote">
          <FiShield /> Your secure store workspace
        </div>
        <div className="auth-form-content">{children}</div>
        <footer className="auth-footer">
          © {new Date().getFullYear()} Extreme Men{" "}
          <span>Designed to move you forward.</span>
        </footer>
      </section>
    </main>
  );
}
