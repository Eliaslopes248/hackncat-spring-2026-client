import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../logo2.png";
import { DEMO_ADMIN_CREDENTIALS, useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function fillDemoCredentials() {
    setUsername(DEMO_ADMIN_CREDENTIALS.username);
    setPassword(DEMO_ADMIN_CREDENTIALS.password);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const signedIn = signIn(username, password);

    if (!signedIn) {
      setError("Invalid admin credentials. Use the Chevron demo admin login to continue.");
      return;
    }

    setError("");
    navigate("/dashboard", { replace: true });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-100">
      <div className="relative isolate min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(226,24,54,0.16),_transparent_28%),linear-gradient(140deg,_#f8fafc_0%,_#eaf1fa_45%,_#dce8f6_100%)]">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-[linear-gradient(135deg,_#003b7d_0%,_#0050aa_55%,_#0c6ad1_100%)]" />
        <div className="absolute right-[-100px] top-16 h-64 w-64 rounded-full bg-chevronRed/12 blur-3xl" />
        <div className="absolute left-[-120px] bottom-[-40px] h-72 w-72 rounded-full bg-chevronBlue/15 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 lg:px-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="flex flex-col justify-between rounded-[28px] border border-white/30 bg-[linear-gradient(160deg,_rgba(0,44,101,0.95)_0%,_rgba(0,80,170,0.92)_48%,_rgba(2,28,66,0.96)_100%)] p-8 text-white shadow-[0_30px_80px_rgba(0,44,101,0.25)] lg:p-12">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                  <span className="h-2 w-2 rounded-full bg-chevronRed" />
                  Chevron Admin Access
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur">
                    <img src={LOGO} alt="Chevron mark" className="h-8 w-8 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-white/65">Operations Console</p>
                    <h1 className="font-lato text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                      Pipe .Net
                    </h1>
                  </div>
                </div>

                <p className="mt-10 max-w-xl text-base leading-7 text-slate-100/90 sm:text-lg">
                  Authenticate with the admin demo account to access the Chevron admin dashboard.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <article className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">Access tier</p>
                  <p className="mt-3 text-2xl font-bold text-white">Admin</p>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">Security mode</p>
                  <p className="mt-3 text-2xl font-bold text-white">Demo Login</p>
                </article>
              </div>
            </section>

            <section className="flex items-center">
              <div className="w-full rounded-[28px] border border-slate-200/80 bg-white/92 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-chevronBlue/70">
                      Restricted Sign In
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Admin Login</h2>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="rounded-full border border-chevronBlue/15 bg-chevronBlue/5 px-4 py-2 text-sm font-semibold text-chevronBlue transition hover:border-chevronBlue/30 hover:bg-chevronBlue/10"
                  >
                    Use Demo Credentials
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-chevronRed/15 bg-chevronRed/[0.04] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-chevronRed">Demo credentials</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Username</p>
                      <p className="mt-2 font-mono text-sm font-semibold text-slate-900">
                        {DEMO_ADMIN_CREDENTIALS.username}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Password</p>
                      <p className="mt-2 font-mono text-sm font-semibold text-slate-900">
                        {DEMO_ADMIN_CREDENTIALS.password}
                      </p>
                    </div>
                  </div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="admin-username" className="mb-2 block text-sm font-semibold text-slate-700">
                      Admin username
                    </label>
                    <input
                      id="admin-username"
                      autoComplete="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Enter your admin username"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-chevronBlue focus:bg-white focus:ring-4 focus:ring-chevronBlue/10"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-chevronBlue focus:bg-white focus:ring-4 focus:ring-chevronBlue/10"
                      required
                    />
                  </div>

                  {error ? (
                    <div className="rounded-2xl border border-chevronRed/20 bg-chevronRed/[0.06] px-4 py-3 text-sm font-medium text-chevronRed">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[linear-gradient(135deg,_#0050aa_0%,_#0c6ad1_100%)] px-4 py-3.5 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-[0_16px_32px_rgba(0,80,170,0.22)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_36px_rgba(0,80,170,0.28)]"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">
                  <p className="font-semibold text-slate-700">Authorized users only</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
