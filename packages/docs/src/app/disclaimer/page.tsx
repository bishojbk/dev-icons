export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1
        className="text-3xl font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        Trademark Disclaimer
      </h1>

      <div
        className="mt-8 space-y-8 text-sm leading-7"
        style={{ color: 'var(--text-secondary)' }}
      >
        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            About the Icons
          </h2>
          <p className="mt-3">
            DevIcon Kit provides icons representing various technologies,
            programming languages, frameworks, tools, and brands for
            identification purposes in developer projects, portfolios,
            documentation, and educational materials.
          </p>
        </section>

        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Trademark Ownership
          </h2>
          <p className="mt-3">
            All product names, logos, brands, trademarks, and registered
            trademarks are the property of their respective owners. The use of
            these names, logos, and brands does not imply endorsement by or
            affiliation with DevIcon Kit.
          </p>
        </section>

        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            License Scope
          </h2>
          <p className="mt-3">
            The MIT License under which this project is released covers{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              only the source code
            </strong>{' '}
            of this library — including the React components, build scripts,
            documentation site code, and tooling. The MIT License does{' '}
            <strong style={{ color: 'var(--text-primary)' }}>not</strong> grant
            any rights to the trademarks, trade names, service marks, or product
            names of any third party.
          </p>
        </section>

        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Your Responsibility
          </h2>
          <p className="mt-3">By using icons from this library, you agree that:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>
                You are responsible
              </strong>{' '}
              for ensuring your use of any icon complies with the trademark
              holder&apos;s brand guidelines and usage policies.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>
                You should review
              </strong>{' '}
              the official brand guidelines of each technology before using their
              icon in your project, especially for commercial purposes.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>
                DevIcon Kit cannot be held responsible
              </strong>{' '}
              for any legal claims arising from your use of the icons contained
              in this library.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>
                Brand guidelines may change
              </strong>{' '}
              — you should periodically verify that your usage still complies
              with the latest guidelines published by the trademark holder.
            </li>
          </ul>
        </section>

        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Icon Accuracy
          </h2>
          <p className="mt-3">
            We strive to keep all icons accurate and up-to-date with the latest
            official branding. However, we make no guarantees about the accuracy
            or currency of any icon. If you notice an outdated or inaccurate
            icon, please open an issue on our GitHub repository.
          </p>
        </section>

        <section>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Requesting Icon Removal
          </h2>
          <p className="mt-3">
            If you are a trademark holder and would like an icon removed from
            this library, please open an issue on our{' '}
            <a
              href="https://github.com/bishojbk/dev-icons"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
              className="underline"
            >
              GitHub repository
            </a>
            . We will promptly comply with all valid removal requests.
          </p>
        </section>

        <div
          className="rounded-xl border p-4 text-xs"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-tertiary)',
          }}
        >
          This disclaimer is inspired by the approach taken by{' '}
          <a
            href="https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
            className="underline"
          >
            Simple Icons
          </a>{' '}
          and other open-source icon libraries.
        </div>
      </div>
    </div>
  );
}
