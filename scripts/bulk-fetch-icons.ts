/**
 * Bulk-fetches icons from simple-icons and writes them to icons/ + data/icons.json.
 * This replaces the manual approach — just define what you want and it handles the rest.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'icons');
const DATA_FILE = path.join(ROOT, 'data', 'icons.json');

// ─── Icon definitions: [simpleIconsKey, ourSlug, category, tags[], aliases[]] ───
const ICON_DEFS: [string, string, string, string[], string[]][] = [
  // ── Languages ──
  ['siJavascript', 'javascript', 'languages', ['language', 'web', 'scripting', 'ecmascript'], ['js', 'es6']],
  ['siTypescript', 'typescript', 'languages', ['language', 'typed', 'microsoft', 'superset'], ['ts']],
  ['siPython', 'python', 'languages', ['language', 'scripting', 'data-science', 'ai'], ['py']],
  ['siRust', 'rust', 'languages', ['language', 'systems', 'memory-safe', 'performance'], ['rustlang']],
  ['siGo', 'go', 'languages', ['language', 'google', 'concurrent', 'systems'], ['golang']],
  ['siJava', 'java', 'languages', ['language', 'jvm', 'enterprise', 'android'], []],
  ['siKotlin', 'kotlin', 'languages', ['language', 'jvm', 'android', 'jetbrains'], ['kt']],
  ['siSwift', 'swift', 'languages', ['language', 'apple', 'ios', 'macos'], []],
  ['siDart', 'dart', 'languages', ['language', 'google', 'flutter', 'mobile'], []],
  ['siCplusplus', 'cplusplus', 'languages', ['language', 'systems', 'performance', 'oop'], ['cpp', 'c++']],
  ['siC', 'c', 'languages', ['language', 'systems', 'low-level', 'performance'], []],
  ['siCsharp', 'csharp', 'languages', ['language', 'microsoft', 'dotnet', 'unity'], ['c#']],
  ['siPhp', 'php', 'languages', ['language', 'web', 'server', 'scripting'], []],
  ['siRuby', 'ruby', 'languages', ['language', 'scripting', 'web', 'rails'], ['rb']],
  ['siScala', 'scala', 'languages', ['language', 'jvm', 'functional', 'big-data'], []],
  ['siElixir', 'elixir', 'languages', ['language', 'functional', 'erlang', 'concurrent'], ['ex']],
  ['siHaskell', 'haskell', 'languages', ['language', 'functional', 'pure', 'academic'], ['hs']],
  ['siLua', 'lua', 'languages', ['language', 'scripting', 'embedded', 'game'], []],
  ['siR', 'r', 'languages', ['language', 'statistics', 'data-science', 'analytics'], ['rlang']],
  ['siPerl', 'perl', 'languages', ['language', 'scripting', 'text-processing', 'regex'], ['pl']],
  ['siZig', 'zig', 'languages', ['language', 'systems', 'performance', 'compiler'], []],
  ['siSolidity', 'solidity', 'languages', ['language', 'blockchain', 'smart-contracts', 'ethereum'], ['sol']],
  ['siGnubash', 'bash', 'languages', ['shell', 'scripting', 'terminal', 'unix'], ['sh']],
  ['siWebassembly', 'webassembly', 'languages', ['runtime', 'performance', 'browser', 'wasm'], ['wasm']],
  ['siOcaml', 'ocaml', 'languages', ['language', 'functional', 'ml', 'compiler'], []],
  ['siClojure', 'clojure', 'languages', ['language', 'functional', 'jvm', 'lisp'], ['clj']],
  ['siFsharp', 'fsharp', 'languages', ['language', 'functional', 'dotnet', 'microsoft'], ['f#']],
  ['siJulia', 'julia', 'languages', ['language', 'scientific', 'data-science', 'performance'], ['jl']],
  ['siNim', 'nim', 'languages', ['language', 'systems', 'compiled', 'python-like'], []],
  ['siErlang', 'erlang', 'languages', ['language', 'functional', 'concurrent', 'telecom'], ['erl']],

  // ── Frontend ──
  ['siReact', 'react', 'frontend', ['library', 'ui', 'meta', 'jsx', 'component'], ['reactjs']],
  ['siNextdotjs', 'nextjs', 'frontend', ['framework', 'react', 'ssr', 'vercel', 'fullstack'], ['next']],
  ['siVuedotjs', 'vuejs', 'frontend', ['framework', 'ui', 'progressive', 'component'], ['vue']],
  ['siAngular', 'angular', 'frontend', ['framework', 'google', 'typescript', 'spa'], ['ng']],
  ['siSvelte', 'svelte', 'frontend', ['framework', 'compiler', 'ui', 'reactive'], []],
  ['siAstro', 'astro', 'frontend', ['framework', 'static', 'islands', 'content'], []],
  ['siRemix', 'remix', 'frontend', ['framework', 'react', 'fullstack', 'ssr'], []],
  ['siNuxtdotjs', 'nuxtjs', 'frontend', ['framework', 'vue', 'ssr', 'fullstack'], ['nuxt']],
  ['siSolidjs', 'solidjs', 'frontend', ['framework', 'reactive', 'ui', 'performance'], ['solid']],
  ['siQwik', 'qwik', 'frontend', ['framework', 'resumable', 'performance', 'ssr'], []],
  ['siGatsby', 'gatsby', 'frontend', ['framework', 'react', 'static', 'graphql'], []],
  ['siTailwindcss', 'tailwindcss', 'frontend', ['css', 'utility', 'styling', 'framework'], ['tailwind']],
  ['siBootstrap', 'bootstrap', 'frontend', ['css', 'framework', 'responsive', 'components'], ['bs']],
  ['siSass', 'sass', 'frontend', ['css', 'preprocessor', 'styling', 'scss'], ['scss']],
  ['siStyledcomponents', 'styledcomponents', 'frontend', ['css-in-js', 'react', 'styling', 'components'], []],
  ['siMui', 'mui', 'frontend', ['ui', 'react', 'material', 'components'], ['material-ui']],
  ['siChakraui', 'chakraui', 'frontend', ['ui', 'react', 'accessible', 'components'], ['chakra']],
  ['siShadcnui', 'shadcnui', 'frontend', ['ui', 'react', 'radix', 'components', 'tailwind'], ['shadcn']],
  ['siRedux', 'redux', 'frontend', ['state', 'react', 'flux', 'store'], []],
  ['siReactquery', 'reactquery', 'frontend', ['data', 'react', 'cache', 'fetching'], ['tanstack-query']],
  ['siStorybook', 'storybook', 'frontend', ['docs', 'ui', 'components', 'testing'], []],
  ['siVite', 'vite', 'frontend', ['build', 'bundler', 'dev-server', 'fast'], ['vitejs']],
  ['siWebpack', 'webpack', 'frontend', ['build', 'bundler', 'module', 'loader'], []],
  ['siRollup', 'rollup', 'frontend', ['build', 'bundler', 'esm', 'treeshake'], ['rollupjs']],
  ['siEsbuild', 'esbuild', 'frontend', ['build', 'bundler', 'fast', 'go'], []],
  ['siThreedotjs', 'threejs', 'frontend', ['3d', 'webgl', 'graphics', 'animation'], ['three']],
  ['siAlpinedotjs', 'alpinejs', 'frontend', ['framework', 'lightweight', 'declarative', 'html'], ['alpine']],
  ['siHtmx', 'htmx', 'frontend', ['framework', 'html', 'ajax', 'hypermedia'], []],
  ['siLit', 'lit', 'frontend', ['web-components', 'lightweight', 'google', 'custom-elements'], []],
  ['siEmotion', 'emotion', 'frontend', ['css-in-js', 'react', 'styling', 'performance'], []],
  ['siPostcss', 'postcss', 'frontend', ['css', 'transform', 'plugins', 'autoprefixer'], []],
  ['siLess', 'less', 'frontend', ['css', 'preprocessor', 'styling', 'variables'], ['lessjs']],

  // ── Backend ──
  ['siNodedotjs', 'nodejs', 'backend', ['runtime', 'javascript', 'server', 'v8'], ['node']],
  ['siExpress', 'express', 'backend', ['framework', 'nodejs', 'http', 'middleware'], ['expressjs']],
  ['siNestjs', 'nestjs', 'backend', ['framework', 'nodejs', 'typescript', 'enterprise'], []],
  ['siFastify', 'fastify', 'backend', ['framework', 'nodejs', 'fast', 'http'], []],
  ['siDjango', 'django', 'backend', ['framework', 'python', 'web', 'batteries'], []],
  ['siFlask', 'flask', 'backend', ['framework', 'python', 'micro', 'web'], []],
  ['siFastapi', 'fastapi', 'backend', ['framework', 'python', 'async', 'api'], []],
  ['siSpring', 'spring', 'backend', ['framework', 'java', 'enterprise', 'boot'], ['spring-boot']],
  ['siSpringboot', 'springboot', 'backend', ['framework', 'java', 'enterprise', 'microservices'], []],
  ['siLaravel', 'laravel', 'backend', ['framework', 'php', 'web', 'eloquent'], []],
  ['siRubyonrails', 'rails', 'backend', ['framework', 'ruby', 'web', 'mvc'], ['ruby-on-rails']],
  ['siDeno', 'deno', 'backend', ['runtime', 'javascript', 'typescript', 'secure'], []],
  ['siBun', 'bun', 'backend', ['runtime', 'javascript', 'fast', 'bundler'], ['bunjs']],
  ['siGraphql', 'graphql', 'backend', ['api', 'query', 'schema', 'typed'], ['gql']],
  ['siApollographql', 'apollographql', 'backend', ['graphql', 'client', 'server', 'cache'], ['apollo']],
  ['siNginx', 'nginx', 'backend', ['server', 'proxy', 'load-balancer', 'web'], []],
  ['siApache', 'apache', 'backend', ['server', 'web', 'http', 'open-source'], ['httpd']],
  ['siDotnet', 'dotnet', 'backend', ['framework', 'microsoft', 'csharp', 'runtime'], ['.net']],
  ['siElectron', 'electron', 'backend', ['desktop', 'chromium', 'nodejs', 'cross-platform'], []],
  ['siTauri', 'tauri', 'backend', ['desktop', 'rust', 'lightweight', 'cross-platform'], []],
  ['siRabbitmq', 'rabbitmq', 'backend', ['messaging', 'queue', 'amqp', 'broker'], []],
  ['siApachekafka', 'kafka', 'backend', ['streaming', 'messaging', 'distributed', 'events'], ['apache-kafka']],
  ['siTrpc', 'trpc', 'backend', ['api', 'typescript', 'rpc', 'type-safe'], []],
  ['siSwagger', 'swagger', 'backend', ['api', 'openapi', 'docs', 'specification'], ['openapi']],
  ['siSocketdotio', 'socketio', 'backend', ['websocket', 'realtime', 'event-driven', 'nodejs'], ['socket.io']],

  // ── Mobile ──
  ['siReact', 'reactnative', 'mobile', ['framework', 'cross-platform', 'javascript', 'meta'], ['rn']],
  ['siFlutter', 'flutter', 'mobile', ['framework', 'cross-platform', 'dart', 'google'], []],
  ['siExpo', 'expo', 'mobile', ['framework', 'react-native', 'toolchain', 'mobile'], []],
  ['siIos', 'ios', 'mobile', ['platform', 'apple', 'mobile', 'swift'], []],
  ['siAndroid', 'android', 'mobile', ['platform', 'google', 'mobile', 'kotlin'], []],
  ['siXcode', 'xcode', 'mobile', ['ide', 'apple', 'ios', 'macos'], []],
  ['siAndroidstudio', 'androidstudio', 'mobile', ['ide', 'google', 'android', 'kotlin'], []],

  // ── Databases ──
  ['siPostgresql', 'postgresql', 'databases', ['database', 'sql', 'relational', 'open-source'], ['postgres', 'pg']],
  ['siMysql', 'mysql', 'databases', ['database', 'sql', 'relational', 'oracle'], []],
  ['siMongodb', 'mongodb', 'databases', ['database', 'nosql', 'document', 'json'], ['mongo']],
  ['siRedis', 'redis', 'databases', ['database', 'cache', 'key-value', 'in-memory'], []],
  ['siSqlite', 'sqlite', 'databases', ['database', 'sql', 'embedded', 'file-based'], []],
  ['siSupabase', 'supabase', 'databases', ['database', 'baas', 'postgres', 'auth'], []],
  ['siFirebase', 'firebase', 'databases', ['database', 'baas', 'google', 'realtime'], []],
  ['siMariadb', 'mariadb', 'databases', ['database', 'sql', 'relational', 'mysql-fork'], []],
  ['siCockroachlabs', 'cockroachdb', 'databases', ['database', 'sql', 'distributed', 'cloud'], []],
  ['siElasticsearch', 'elasticsearch', 'databases', ['search', 'analytics', 'nosql', 'elk'], ['elastic']],
  ['siNeo4j', 'neo4j', 'databases', ['database', 'graph', 'nosql', 'cypher'], []],
  ['siApachecassandra', 'cassandra', 'databases', ['database', 'nosql', 'distributed', 'wide-column'], []],
  ['siPrisma', 'prisma', 'databases', ['orm', 'typescript', 'database', 'schema'], []],
  ['siDrizzle', 'drizzle', 'databases', ['orm', 'typescript', 'sql', 'lightweight'], []],
  ['siPlanetscale', 'planetscale', 'databases', ['database', 'mysql', 'serverless', 'branching'], []],
  ['siTurso', 'turso', 'databases', ['database', 'sqlite', 'edge', 'embedded'], []],
  ['siDynamodb', 'dynamodb', 'databases', ['database', 'nosql', 'aws', 'key-value'], ['dynamo']],
  ['siAmazondynamodb', 'amazondynamodb', 'databases', ['database', 'nosql', 'aws', 'key-value'], []],

  // ── DevOps ──
  ['siDocker', 'docker', 'devops', ['container', 'virtualization', 'deployment', 'devops'], []],
  ['siKubernetes', 'kubernetes', 'devops', ['orchestration', 'container', 'k8s', 'cloud-native'], ['k8s']],
  ['siTerraform', 'terraform', 'devops', ['iac', 'infrastructure', 'hashicorp', 'cloud'], ['tf']],
  ['siAnsible', 'ansible', 'devops', ['automation', 'iac', 'configuration', 'redhat'], []],
  ['siJenkins', 'jenkins', 'devops', ['ci-cd', 'automation', 'pipeline', 'java'], []],
  ['siGithubactions', 'githubactions', 'devops', ['ci-cd', 'automation', 'github', 'workflow'], ['gha']],
  ['siGitlab', 'gitlab', 'devops', ['ci-cd', 'git', 'platform', 'devops'], ['gl']],
  ['siCircleci', 'circleci', 'devops', ['ci-cd', 'automation', 'pipeline', 'cloud'], []],
  ['siTravisci', 'travisci', 'devops', ['ci-cd', 'automation', 'testing', 'open-source'], []],
  ['siArgocd', 'argocd', 'devops', ['gitops', 'kubernetes', 'deployment', 'cd'], ['argo']],
  ['siHelm', 'helm', 'devops', ['kubernetes', 'package', 'charts', 'deployment'], []],
  ['siPrometheus', 'prometheus', 'devops', ['monitoring', 'metrics', 'alerting', 'time-series'], []],
  ['siGrafana', 'grafana', 'devops', ['monitoring', 'dashboard', 'visualization', 'observability'], []],
  ['siDatadog', 'datadog', 'devops', ['monitoring', 'apm', 'logs', 'observability'], []],
  ['siSentry', 'sentry', 'devops', ['error-tracking', 'monitoring', 'debugging', 'crash'], []],
  ['siPulumi', 'pulumi', 'devops', ['iac', 'infrastructure', 'cloud', 'code'], []],
  ['siVault', 'vault', 'devops', ['secrets', 'security', 'hashicorp', 'encryption'], []],
  ['siPacker', 'packer', 'devops', ['image', 'build', 'hashicorp', 'automation'], []],

  // ── Cloud ──
  ['siAmazonwebservices', 'aws', 'cloud', ['cloud', 'amazon', 'infrastructure', 'services'], ['amazon-web-services']],
  ['siGooglecloud', 'gcp', 'cloud', ['cloud', 'google', 'infrastructure', 'services'], ['google-cloud']],
  ['siMicrosoftazure', 'azure', 'cloud', ['cloud', 'microsoft', 'infrastructure', 'services'], []],
  ['siVercel', 'vercel', 'cloud', ['hosting', 'edge', 'serverless', 'nextjs'], []],
  ['siNetlify', 'netlify', 'cloud', ['hosting', 'jamstack', 'serverless', 'ci-cd'], []],
  ['siCloudflare', 'cloudflare', 'cloud', ['cdn', 'dns', 'security', 'edge'], ['cf']],
  ['siDigitalocean', 'digitalocean', 'cloud', ['cloud', 'hosting', 'droplets', 'kubernetes'], ['do']],
  ['siHeroku', 'heroku', 'cloud', ['hosting', 'paas', 'deployment', 'salesforce'], []],
  ['siRender', 'render', 'cloud', ['hosting', 'paas', 'deployment', 'cloud'], []],
  ['siFlydotio', 'flyio', 'cloud', ['hosting', 'edge', 'containers', 'distributed'], ['fly']],
  ['siLinode', 'linode', 'cloud', ['cloud', 'hosting', 'vps', 'akamai'], []],
  ['siRailway', 'railway', 'cloud', ['hosting', 'paas', 'deployment', 'infrastructure'], []],

  // ── AI & ML ──
  ['siOpenai', 'openai', 'ai-ml', ['ai', 'llm', 'gpt', 'chatgpt', 'machine-learning'], ['chatgpt', 'gpt']],
  ['siPytorch', 'pytorch', 'ai-ml', ['ai', 'deep-learning', 'framework', 'meta'], ['torch']],
  ['siTensorflow', 'tensorflow', 'ai-ml', ['ai', 'deep-learning', 'framework', 'google'], ['tf-ml']],
  ['siHuggingface', 'huggingface', 'ai-ml', ['ai', 'nlp', 'transformers', 'models'], ['hf']],
  ['siJupyter', 'jupyter', 'ai-ml', ['notebook', 'data-science', 'python', 'interactive'], []],
  ['siNumpy', 'numpy', 'ai-ml', ['math', 'array', 'scientific', 'python'], ['np']],
  ['siPandas', 'pandas', 'ai-ml', ['data', 'dataframe', 'analysis', 'python'], ['pd']],
  ['siScikitlearn', 'scikitlearn', 'ai-ml', ['ml', 'classification', 'regression', 'python'], ['sklearn']],
  ['siOpencv', 'opencv', 'ai-ml', ['computer-vision', 'image', 'processing', 'ai'], ['cv']],
  ['siKeras', 'keras', 'ai-ml', ['deep-learning', 'api', 'neural-network', 'tensorflow'], []],
  ['siGooglecolab', 'googlecolab', 'ai-ml', ['notebook', 'cloud', 'gpu', 'google'], ['colab']],
  ['siOllama', 'ollama', 'ai-ml', ['llm', 'local', 'inference', 'open-source'], []],
  ['siLangchain', 'langchain', 'ai-ml', ['llm', 'framework', 'rag', 'agents'], []],
  ['siYolo', 'yolo', 'ai-ml', ['object-detection', 'computer-vision', 'real-time', 'ultralytics'], ['yolov8', 'yolov11']],
  ['siUltralytics', 'ultralytics', 'ai-ml', ['computer-vision', 'yolo', 'object-detection', 'platform'], []],
  ['siOnnx', 'onnx', 'ai-ml', ['model', 'inference', 'interoperability', 'runtime'], []],
  ['siMlflow', 'mlflow', 'ai-ml', ['mlops', 'experiment-tracking', 'model-registry', 'deployment'], []],
  ['siRoboflow', 'roboflow', 'ai-ml', ['computer-vision', 'annotation', 'dataset', 'deployment'], []],
  ['siWeightsandbiases', 'wandb', 'ai-ml', ['mlops', 'experiment-tracking', 'visualization', 'logging'], ['weights-and-biases']],

  // ── Tools ──
  ['siGit', 'git', 'tools', ['version-control', 'vcs', 'scm'], []],
  ['siGithub', 'github', 'tools', ['platform', 'git', 'hosting', 'collaboration', 'microsoft'], ['gh']],
  ['siGitlab', 'gitlabtools', 'tools', ['platform', 'git', 'hosting', 'ci-cd'], []],
  ['siBitbucket', 'bitbucket', 'tools', ['platform', 'git', 'hosting', 'atlassian'], ['bb']],
  ['siVisualstudiocode', 'vscode', 'tools', ['editor', 'ide', 'microsoft', 'code'], ['visual-studio-code']],
  ['siNeovim', 'neovim', 'tools', ['editor', 'terminal', 'vim', 'extensible'], ['nvim']],
  ['siVim', 'vim', 'tools', ['editor', 'terminal', 'modal', 'unix'], ['vi']],
  ['siSublimetext', 'sublimetext', 'tools', ['editor', 'fast', 'cross-platform'], ['subl']],
  ['siIntellijidea', 'intellij', 'tools', ['ide', 'jetbrains', 'java', 'kotlin'], ['idea']],
  ['siPostman', 'postman', 'tools', ['api', 'testing', 'http', 'rest'], []],
  ['siInsomnia', 'insomnia', 'tools', ['api', 'testing', 'http', 'graphql'], []],
  ['siNpm', 'npm', 'tools', ['package', 'registry', 'nodejs', 'javascript'], []],
  ['siYarn', 'yarn', 'tools', ['package', 'manager', 'nodejs', 'javascript'], []],
  ['siPnpm', 'pnpm', 'tools', ['package', 'manager', 'fast', 'disk-efficient'], []],
  ['siEslint', 'eslint', 'tools', ['linter', 'javascript', 'code-quality', 'rules'], []],
  ['siPrettier', 'prettier', 'tools', ['formatter', 'code-style', 'opinionated', 'auto'], []],
  ['siNotion', 'notion', 'tools', ['docs', 'wiki', 'workspace', 'collaboration'], []],
  ['siLinear', 'linear', 'tools', ['project', 'issues', 'tracking', 'agile'], []],
  ['siJira', 'jira', 'tools', ['project', 'issues', 'agile', 'atlassian'], []],
  ['siSlack', 'slack', 'tools', ['communication', 'chat', 'team', 'channels'], []],
  ['siDiscord', 'discord', 'tools', ['communication', 'chat', 'voice', 'community'], []],
  ['siTurborepo', 'turborepo', 'tools', ['monorepo', 'build', 'cache', 'vercel'], ['turbo']],
  ['siNx', 'nx', 'tools', ['monorepo', 'build', 'workspace', 'nrwl'], []],
  ['siGithubcopilot', 'githubcopilot', 'tools', ['ai', 'code-completion', 'github', 'assistant'], ['copilot']],
  ['siWarp', 'warp', 'tools', ['terminal', 'rust', 'modern', 'ai'], []],
  ['siIterm2', 'iterm2', 'tools', ['terminal', 'macos', 'shell', 'emulator'], ['iterm']],
  ['siGnometerminal', 'gnometerminal', 'tools', ['terminal', 'linux', 'gnome', 'shell'], []],
  ['siHomebrew', 'homebrew', 'tools', ['package', 'macos', 'linux', 'manager'], ['brew']],

  // ── Design ──
  ['siFigma', 'figma', 'design', ['design', 'ui', 'prototyping', 'collaboration'], []],
  ['siSketch', 'sketch', 'design', ['design', 'ui', 'macos', 'vector'], []],
  ['siFramer', 'framer', 'design', ['design', 'prototyping', 'animation', 'react'], []],
  ['siCanva', 'canva', 'design', ['design', 'graphics', 'templates', 'web'], []],
  ['siAdobephotoshop', 'photoshop', 'design', ['design', 'adobe', 'image', 'raster'], ['ps']],
  ['siAdobeillustrator', 'illustrator', 'design', ['design', 'adobe', 'vector', 'graphics'], ['ai-design']],
  ['siAdobexd', 'adobexd', 'design', ['design', 'adobe', 'prototyping', 'ui'], ['xd']],
  ['siBlender', 'blender', 'design', ['3d', 'modeling', 'animation', 'open-source'], []],
  ['siInvision', 'invision', 'design', ['design', 'prototyping', 'collaboration', 'ui'], []],
  ['siZeplin', 'zeplin', 'design', ['design', 'handoff', 'specs', 'collaboration'], []],

  // ── Testing ──
  ['siJest', 'jest', 'testing', ['testing', 'javascript', 'unit', 'snapshot'], []],
  ['siVitest', 'vitest', 'testing', ['testing', 'vite', 'fast', 'unit'], []],
  ['siCypress', 'cypress', 'testing', ['testing', 'e2e', 'browser', 'integration'], ['cy']],
  ['siPlaywright', 'playwright', 'testing', ['testing', 'e2e', 'browser', 'microsoft'], ['pw']],
  ['siSelenium', 'selenium', 'testing', ['testing', 'e2e', 'browser', 'automation'], []],
  ['siMocha', 'mocha', 'testing', ['testing', 'javascript', 'runner', 'bdd'], []],
  ['siTestinglibrary', 'testinglibrary', 'testing', ['testing', 'dom', 'accessible', 'react'], ['rtl']],
  ['siPuppeteer', 'puppeteer', 'testing', ['testing', 'browser', 'chromium', 'headless'], []],

  // ── Browsers ──
  ['siGooglechrome', 'chrome', 'browsers', ['browser', 'google', 'chromium', 'web'], []],
  ['siFirefox', 'firefox', 'browsers', ['browser', 'mozilla', 'gecko', 'web'], []],
  ['siSafari', 'safari', 'browsers', ['browser', 'apple', 'webkit', 'web'], []],
  ['siMicrosoftedge', 'edge', 'browsers', ['browser', 'microsoft', 'chromium', 'web'], []],
  ['siBrave', 'brave', 'browsers', ['browser', 'privacy', 'chromium', 'web'], []],
  ['siOpera', 'opera', 'browsers', ['browser', 'chromium', 'web', 'vpn'], []],
  ['siArc', 'arc', 'browsers', ['browser', 'chromium', 'modern', 'tabs'], []],
  ['siTorbrowser', 'torbrowser', 'browsers', ['browser', 'privacy', 'anonymity', 'onion'], ['tor']],
  ['siVivaldi', 'vivaldi', 'browsers', ['browser', 'chromium', 'customizable', 'web'], []],

  // ── OS ──
  ['siLinux', 'linux', 'os', ['operating-system', 'kernel', 'open-source', 'unix'], []],
  ['siUbuntu', 'ubuntu', 'os', ['operating-system', 'linux', 'debian', 'canonical'], []],
  ['siDebian', 'debian', 'os', ['operating-system', 'linux', 'stable', 'free'], []],
  ['siFedora', 'fedora', 'os', ['operating-system', 'linux', 'redhat', 'rpm'], []],
  ['siArchlinux', 'archlinux', 'os', ['operating-system', 'linux', 'rolling', 'minimal'], ['arch']],
  ['siAlpinelinux', 'alpinelinux', 'os', ['operating-system', 'linux', 'minimal', 'docker'], ['alpine']],
  ['siWindows', 'windows', 'os', ['operating-system', 'microsoft', 'desktop', 'enterprise'], ['win']],
  ['siMacos', 'macos', 'os', ['operating-system', 'apple', 'desktop', 'unix'], ['mac']],
  ['siCentos', 'centos', 'os', ['operating-system', 'linux', 'rhel', 'server'], []],

  // ── Social / Media ──
  ['siX', 'x', 'social', ['social', 'microblog', 'elon', 'media'], ['twitter']],
  ['siLinkedin', 'linkedin', 'social', ['social', 'professional', 'networking', 'microsoft'], []],
  ['siYoutube', 'youtube', 'social', ['video', 'streaming', 'google', 'content'], ['yt']],
  ['siTwitch', 'twitch', 'social', ['streaming', 'gaming', 'live', 'amazon'], []],
  ['siReddit', 'reddit', 'social', ['forum', 'community', 'discussion', 'social'], []],
  ['siDevdotto', 'devto', 'social', ['blog', 'developer', 'community', 'articles'], ['dev.to']],
  ['siHashnode', 'hashnode', 'social', ['blog', 'developer', 'community', 'writing'], []],
  ['siMedium', 'medium', 'social', ['blog', 'writing', 'articles', 'publishing'], []],
  ['siStackoverflow', 'stackoverflow', 'social', ['qa', 'developer', 'community', 'knowledge'], ['so']],
  ['siProducthunt', 'producthunt', 'social', ['product', 'launch', 'startup', 'community'], ['ph']],
  ['siInstagram', 'instagram', 'social', ['social', 'photo', 'stories', 'meta'], ['ig']],
  ['siFacebook', 'facebook', 'social', ['social', 'networking', 'meta', 'community'], ['fb']],
  ['siTiktok', 'tiktok', 'social', ['social', 'video', 'short-form', 'bytedance'], []],
  ['siWhatsapp', 'whatsapp', 'social', ['messaging', 'chat', 'meta', 'communication'], ['wa']],
  ['siTelegram', 'telegram', 'social', ['messaging', 'chat', 'cloud', 'communication'], ['tg']],
  ['siSnapchat', 'snapchat', 'social', ['social', 'messaging', 'stories', 'ar'], ['snap']],
  ['siPinterest', 'pinterest', 'social', ['social', 'visual', 'bookmarks', 'inspiration'], []],
  ['siThreads', 'threads', 'social', ['social', 'microblog', 'meta', 'text'], []],
  ['siMastodon', 'mastodon', 'social', ['social', 'fediverse', 'decentralized', 'open-source'], []],
  ['siBluesky', 'bluesky', 'social', ['social', 'microblog', 'decentralized', 'at-protocol'], ['bsky']],
  ['siSignal', 'signal', 'social', ['messaging', 'privacy', 'encrypted', 'communication'], []],
  ['siSpotify', 'spotify', 'social', ['music', 'streaming', 'podcast', 'audio'], []],
  ['siDribbble', 'dribbble', 'social', ['design', 'portfolio', 'community', 'shots'], []],
  ['siBehance', 'behance', 'social', ['design', 'portfolio', 'adobe', 'community'], []],
  ['siPatreon', 'patreon', 'social', ['funding', 'creator', 'subscription', 'support'], []],
  ['siBuymeacoffee', 'buymeacoffee', 'social', ['funding', 'creator', 'tips', 'support'], ['bmc']],
  ['siKofi', 'kofi', 'social', ['funding', 'creator', 'donations', 'support'], ['ko-fi']],
  ['siLine', 'line', 'social', ['messaging', 'japan', 'communication', 'social'], []],
  ['siWechat', 'wechat', 'social', ['messaging', 'china', 'communication', 'social'], []],
  ['siSoundcloud', 'soundcloud', 'social', ['music', 'streaming', 'audio', 'creator'], []],

  // ── Brands & Companies ──
  ['siGoogle', 'google', 'brands', ['company', 'search', 'tech', 'alphabet'], []],
  ['siApple', 'apple', 'brands', ['company', 'hardware', 'software', 'ios'], []],
  ['siMeta', 'meta', 'brands', ['company', 'social', 'facebook', 'vr'], []],
  ['siNetflix', 'netflix', 'brands', ['streaming', 'video', 'entertainment', 'content'], []],
  ['siUber', 'uber', 'brands', ['ride-sharing', 'delivery', 'mobility', 'transport'], []],
  ['siAirbnb', 'airbnb', 'brands', ['travel', 'accommodation', 'hospitality', 'rental'], []],
  ['siShopify', 'shopify', 'brands', ['ecommerce', 'store', 'platform', 'saas'], []],
  ['siAdobe', 'adobe', 'brands', ['software', 'creative', 'design', 'tools'], []],
  ['siAtlassian', 'atlassian', 'brands', ['software', 'project-management', 'collaboration', 'tools'], []],
  ['siSalesforce', 'salesforce', 'brands', ['crm', 'cloud', 'enterprise', 'saas'], []],
  ['siOracle', 'oracle', 'brands', ['database', 'enterprise', 'cloud', 'java'], []],
  ['siIntel', 'intel', 'brands', ['hardware', 'cpu', 'semiconductor', 'chip'], []],
  ['siNvidia', 'nvidia', 'brands', ['hardware', 'gpu', 'ai', 'gaming'], []],
  ['siAmd', 'amd', 'brands', ['hardware', 'cpu', 'gpu', 'semiconductor'], []],
  ['siSamsung', 'samsung', 'brands', ['hardware', 'electronics', 'mobile', 'display'], []],
  ['siSony', 'sony', 'brands', ['hardware', 'electronics', 'gaming', 'entertainment'], []],
  ['siIbm', 'ibm', 'brands', ['enterprise', 'cloud', 'ai', 'consulting'], []],
  ['siTwilio', 'twilio', 'brands', ['communication', 'api', 'sms', 'voice'], []],
  ['siMailchimp', 'mailchimp', 'brands', ['email', 'marketing', 'automation', 'newsletter'], []],
  ['siContentful', 'contentful', 'brands', ['cms', 'headless', 'content', 'api'], []],
  ['siSanity', 'sanity', 'brands', ['cms', 'headless', 'structured-content', 'api'], []],
  ['siStrapi', 'strapi', 'brands', ['cms', 'headless', 'open-source', 'api'], []],
  ['siNewrelic', 'newrelic', 'brands', ['monitoring', 'apm', 'observability', 'analytics'], []],
  ['siPagerduty', 'pagerduty', 'brands', ['incident', 'oncall', 'alerting', 'ops'], []],
  ['siClaude', 'claude', 'brands', ['ai', 'llm', 'anthropic', 'assistant'], []],
  ['siAnthropic', 'anthropic', 'brands', ['ai', 'company', 'safety', 'research'], []],
  ['siGooglegemini', 'googlegemini', 'brands', ['ai', 'llm', 'google', 'multimodal'], ['gemini']],

  // ── Gaming ──
  ['siSteam', 'steam', 'gaming', ['platform', 'store', 'valve', 'pc'], []],
  ['siEpicgames', 'epicgames', 'gaming', ['platform', 'store', 'unreal', 'fortnite'], ['epic']],
  ['siUnity', 'unity', 'gaming', ['engine', 'game-dev', '3d', 'cross-platform'], []],
  ['siUnrealengine', 'unrealengine', 'gaming', ['engine', 'game-dev', '3d', 'epic'], ['ue']],
  ['siGodotengine', 'godotengine', 'gaming', ['engine', 'game-dev', 'open-source', '2d'], ['godot']],
  ['siPlaystation', 'playstation', 'gaming', ['console', 'sony', 'gaming', 'hardware'], ['ps']],
  ['siNintendo', 'nintendo', 'gaming', ['console', 'gaming', 'hardware', 'japan'], []],

  // ── Hardware / IoT ──
  ['siRaspberrypi', 'raspberrypi', 'hardware', ['sbc', 'iot', 'linux', 'embedded'], ['rpi']],
  ['siArduino', 'arduino', 'hardware', ['microcontroller', 'iot', 'embedded', 'electronics'], []],

  // ── Crypto / Web3 ──
  ['siBitcoin', 'bitcoin', 'crypto', ['cryptocurrency', 'blockchain', 'decentralized', 'btc'], ['btc']],
  ['siEthereum', 'ethereum', 'crypto', ['cryptocurrency', 'blockchain', 'smart-contracts', 'eth'], ['eth']],
  ['siSolana', 'solana', 'crypto', ['cryptocurrency', 'blockchain', 'fast', 'sol'], ['sol-crypto']],
  ['siPolygon', 'polygon', 'crypto', ['cryptocurrency', 'blockchain', 'layer2', 'matic'], ['matic']],

  // ── Productivity ──
  ['siZoom', 'zoom', 'productivity', ['video', 'meetings', 'conference', 'communication'], []],
  ['siGooglemeet', 'googlemeet', 'productivity', ['video', 'meetings', 'google', 'communication'], []],
  ['siCalendly', 'calendly', 'productivity', ['scheduling', 'calendar', 'meetings', 'booking'], []],
  ['siTodoist', 'todoist', 'productivity', ['tasks', 'todo', 'productivity', 'organization'], []],
  ['siObsidian', 'obsidian', 'productivity', ['notes', 'knowledge', 'markdown', 'graph'], []],
  ['siLogseq', 'logseq', 'productivity', ['notes', 'knowledge', 'open-source', 'graph'], []],
  ['siMiro', 'miro', 'productivity', ['whiteboard', 'collaboration', 'design', 'brainstorm'], []],
  ['siRaycast', 'raycast', 'productivity', ['launcher', 'macos', 'productivity', 'extensions'], []],

  // ── Documentation ──
  ['siDocusaurus', 'docusaurus', 'tools', ['docs', 'static-site', 'react', 'meta'], []],
  ['siVitepress', 'vitepress', 'tools', ['docs', 'static-site', 'vue', 'vite'], []],
  ['siGithubpages', 'githubpages', 'tools', ['hosting', 'static', 'github', 'free'], []],
  ['siHetzner', 'hetzner', 'cloud', ['cloud', 'hosting', 'vps', 'europe'], []],
  ['siVultr', 'vultr', 'cloud', ['cloud', 'hosting', 'vps', 'compute'], []],

  // ── Misc ──
  ['siMarkdown', 'markdown', 'misc', ['markup', 'docs', 'text', 'formatting'], ['md']],
  ['siJson', 'json', 'misc', ['data', 'format', 'api', 'serialization'], []],
  ['siYaml', 'yaml', 'misc', ['data', 'config', 'format', 'serialization'], ['yml']],
  ['siToml', 'toml', 'misc', ['data', 'config', 'format', 'rust'], []],
  ['siGnuprivacyguard', 'gpg', 'misc', ['security', 'encryption', 'signing', 'privacy'], ['gnupg']],
  ['siLetsencrypt', 'letsencrypt', 'misc', ['security', 'ssl', 'certificate', 'free'], []],
  ['siAuth0', 'auth0', 'misc', ['auth', 'identity', 'oauth', 'sso'], []],
  ['siJsonwebtokens', 'jwt', 'misc', ['auth', 'token', 'security', 'standard'], []],
  ['siStripe', 'stripe', 'misc', ['payments', 'billing', 'api', 'fintech'], []],
  ['siPaypal', 'paypal', 'misc', ['payments', 'checkout', 'fintech', 'transfer'], []],
  ['siGitpod', 'gitpod', 'misc', ['ide', 'cloud', 'dev-environment', 'workspace'], []],
  ['siCodepen', 'codepen', 'misc', ['playground', 'code', 'frontend', 'demo'], []],
  ['siStackblitz', 'stackblitz', 'misc', ['playground', 'code', 'browser', 'ide'], []],
  ['siReplit', 'replit', 'misc', ['playground', 'code', 'cloud', 'ide'], []],
  ['siWasmcloud', 'wasmcloud', 'misc', ['wasm', 'cloud', 'distributed', 'platform'], []],

  // ── Batch 2: More icons ──
  // Freelance
  ['siUpwork', 'upwork', 'social', ['freelance', 'jobs', 'remote', 'platform'], []],
  ['siFiverr', 'fiverr', 'social', ['freelance', 'services', 'gig', 'platform'], []],
  // Frontend
  ['siPreact', 'preact', 'frontend', ['framework', 'react', 'lightweight', 'fast'], []],
  // CMS
  ['siWordpress', 'wordpress', 'backend', ['cms', 'blog', 'php', 'open-source'], ['wp']],
  ['siGhost', 'ghost', 'backend', ['cms', 'blog', 'publishing', 'newsletter'], []],
  ['siDrupal', 'drupal', 'backend', ['cms', 'php', 'enterprise', 'open-source'], []],
  // IDEs
  ['siPycharm', 'pycharm', 'tools', ['ide', 'jetbrains', 'python', 'debugging'], []],
  ['siWebstorm', 'webstorm', 'tools', ['ide', 'jetbrains', 'javascript', 'typescript'], []],
  ['siGoland', 'goland', 'tools', ['ide', 'jetbrains', 'go', 'debugging'], []],
  ['siPhpstorm', 'phpstorm', 'tools', ['ide', 'jetbrains', 'php', 'debugging'], []],
  ['siRider', 'rider', 'tools', ['ide', 'jetbrains', 'dotnet', 'csharp'], []],
  ['siDatagrip', 'datagrip', 'tools', ['ide', 'jetbrains', 'database', 'sql'], []],
  ['siCursor', 'cursor', 'tools', ['ide', 'ai', 'code-editor', 'fork'], []],
  // Package managers
  ['siChocolatey', 'chocolatey', 'tools', ['package', 'windows', 'manager', 'automation'], ['choco']],
  ['siComposer', 'composer', 'tools', ['package', 'php', 'manager', 'dependency'], []],
  ['siRubygems', 'rubygems', 'tools', ['package', 'ruby', 'manager', 'gems'], ['gem']],
  ['siHoppscotch', 'hoppscotch', 'tools', ['api', 'testing', 'http', 'open-source'], []],
  // Monitoring/infra
  ['siKibana', 'kibana', 'devops', ['visualization', 'analytics', 'elk', 'dashboard'], []],
  ['siLogstash', 'logstash', 'devops', ['logging', 'pipeline', 'elk', 'data'], []],
  ['siCaddy', 'caddy', 'devops', ['server', 'https', 'automatic', 'go'], []],
  // Cloud/CDN
  ['siAkamai', 'akamai', 'cloud', ['cdn', 'security', 'edge', 'performance'], []],
  ['siFastly', 'fastly', 'cloud', ['cdn', 'edge', 'compute', 'performance'], []],
  // Auth
  ['siOkta', 'okta', 'misc', ['auth', 'identity', 'sso', 'enterprise'], []],
  ['siClerk', 'clerk', 'misc', ['auth', 'identity', 'react', 'nextjs'], []],
  // Project management
  ['siTrello', 'trello', 'tools', ['project', 'kanban', 'board', 'atlassian'], []],
  ['siAsana', 'asana', 'tools', ['project', 'tasks', 'team', 'management'], []],
  ['siClickup', 'clickup', 'tools', ['project', 'tasks', 'productivity', 'management'], []],
  // AI/ML
  ['siAnaconda', 'anaconda', 'ai-ml', ['python', 'data-science', 'package', 'environment'], ['conda']],
  // Docs
  ['siGitbook', 'gitbook', 'tools', ['docs', 'documentation', 'wiki', 'knowledge'], []],
  ['siReadthedocs', 'readthedocs', 'tools', ['docs', 'documentation', 'sphinx', 'hosting'], ['rtd']],
  // Productivity/no-code
  ['siAirtable', 'airtable', 'tools', ['database', 'spreadsheet', 'no-code', 'collaboration'], []],
  ['siZapier', 'zapier', 'tools', ['automation', 'integration', 'workflow', 'no-code'], []],
  // Design/website builders
  ['siWebflow', 'webflow', 'design', ['website', 'builder', 'no-code', 'cms'], []],
  ['siWix', 'wix', 'design', ['website', 'builder', 'hosting', 'drag-drop'], []],
  ['siSquarespace', 'squarespace', 'design', ['website', 'builder', 'ecommerce', 'templates'], []],
  // Gaming
  ['siItchdotio', 'itchio', 'gaming', ['indie', 'games', 'marketplace', 'platform'], ['itch.io']],
  ['siRoblox', 'roblox', 'gaming', ['platform', 'game-dev', 'metaverse', 'lua'], []],

  // ── Batch 3: 90 more icons ──
  // Languages
  ['siCoffeescript', 'coffeescript', 'languages', ['language', 'javascript', 'compile', 'functional'], []],
  ['siFortran', 'fortran', 'languages', ['language', 'scientific', 'legacy', 'hpc'], []],
  ['siAssemblyscript', 'assemblyscript', 'languages', ['language', 'wasm', 'typescript', 'compile'], []],
  ['siV', 'v', 'languages', ['language', 'systems', 'fast', 'simple'], []],
  ['siGleam', 'gleam', 'languages', ['language', 'functional', 'erlang', 'type-safe'], []],
  ['siRescript', 'rescript', 'languages', ['language', 'functional', 'javascript', 'ocaml'], []],
  ['siPurescript', 'purescript', 'languages', ['language', 'functional', 'haskell', 'javascript'], []],
  ['siElm', 'elm', 'languages', ['language', 'functional', 'frontend', 'type-safe'], []],
  // Frontend
  ['siCapacitor', 'capacitor', 'frontend', ['mobile', 'hybrid', 'ionic', 'cross-platform'], []],
  ['siIonic', 'ionic', 'frontend', ['mobile', 'hybrid', 'angular', 'cross-platform'], []],
  ['siGulp', 'gulp', 'frontend', ['build', 'task-runner', 'streaming', 'automation'], []],
  ['siBabel', 'babel', 'frontend', ['compiler', 'javascript', 'transpiler', 'es6'], []],
  ['siSwc', 'swc', 'frontend', ['compiler', 'rust', 'fast', 'javascript'], []],
  ['siDaisyui', 'daisyui', 'frontend', ['ui', 'tailwind', 'components', 'css'], []],
  ['siRadixui', 'radixui', 'frontend', ['ui', 'accessible', 'unstyled', 'primitives'], []],
  ['siHeadlessui', 'headlessui', 'frontend', ['ui', 'accessible', 'unstyled', 'tailwind'], []],
  ['siAntdesign', 'antdesign', 'frontend', ['ui', 'react', 'enterprise', 'components'], []],
  ['siMantine', 'mantine', 'frontend', ['ui', 'react', 'hooks', 'components'], []],
  ['siMobx', 'mobx', 'frontend', ['state', 'reactive', 'observable', 'simple'], []],
  ['siReactrouter', 'reactrouter', 'frontend', ['routing', 'react', 'navigation', 'spa'], []],
  ['siChartdotjs', 'chartdotjs', 'frontend', ['visualization', 'charts', 'canvas', 'data'], []],
  ['siLeaflet', 'leaflet', 'frontend', ['maps', 'geospatial', 'interactive', 'open-source'], []],
  ['siMapbox', 'mapbox', 'frontend', ['maps', 'geospatial', 'tiles', 'navigation'], []],
  ['siPwa', 'pwa', 'frontend', ['progressive', 'web-app', 'offline', 'installable'], []],
  // Backend
  ['siSymfony', 'symfony', 'backend', ['framework', 'php', 'enterprise', 'components'], []],
  ['siCodeigniter', 'codeigniter', 'backend', ['framework', 'php', 'lightweight', 'mvc'], []],
  ['siAdonisjs', 'adonisjs', 'backend', ['framework', 'nodejs', 'typescript', 'mvc'], []],
  ['siHono', 'hono', 'backend', ['framework', 'edge', 'fast', 'web-standards'], []],
  ['siMqtt', 'mqtt', 'backend', ['messaging', 'iot', 'lightweight', 'pubsub'], []],
  ['siApachespark', 'apachespark', 'backend', ['big-data', 'processing', 'distributed', 'analytics'], []],
  ['siApacheairflow', 'apacheairflow', 'backend', ['orchestration', 'pipeline', 'workflow', 'data'], []],
  ['siCelery', 'celery', 'backend', ['task-queue', 'async', 'distributed', 'python'], []],
  ['siGunicorn', 'gunicorn', 'backend', ['server', 'python', 'wsgi', 'http'], []],
  ['siPm2', 'pm2', 'backend', ['process-manager', 'nodejs', 'daemon', 'cluster'], []],
  // Databases
  ['siInfluxdb', 'influxdb', 'databases', ['database', 'time-series', 'monitoring', 'iot'], []],
  ['siDuckdb', 'duckdb', 'databases', ['database', 'analytics', 'embedded', 'olap'], []],
  ['siSurrealdb', 'surrealdb', 'databases', ['database', 'multi-model', 'realtime', 'serverless'], []],
  ['siUpstash', 'upstash', 'databases', ['database', 'serverless', 'redis', 'kafka'], []],
  ['siConvex', 'convex', 'databases', ['database', 'backend', 'realtime', 'serverless'], []],
  ['siMeilisearch', 'meilisearch', 'databases', ['search', 'fast', 'typo-tolerant', 'open-source'], []],
  ['siAlgolia', 'algolia', 'databases', ['search', 'api', 'instant', 'hosted'], []],
  // DevOps
  ['siPodman', 'podman', 'devops', ['container', 'rootless', 'daemonless', 'oci'], []],
  ['siRancher', 'rancher', 'devops', ['kubernetes', 'management', 'suse', 'multi-cluster'], []],
  ['siIstio', 'istio', 'devops', ['service-mesh', 'kubernetes', 'traffic', 'security'], []],
  ['siConsul', 'consul', 'devops', ['service-discovery', 'hashicorp', 'mesh', 'config'], []],
  ['siNomad', 'nomad', 'devops', ['orchestration', 'hashicorp', 'scheduler', 'workloads'], []],
  ['siVagrant', 'vagrant', 'devops', ['virtualization', 'hashicorp', 'dev-environments', 'reproducible'], []],
  ['siElastic', 'elastic', 'devops', ['search', 'observability', 'security', 'elk'], []],
  ['siFluentd', 'fluentd', 'devops', ['logging', 'collection', 'unified', 'cncf'], []],
  ['siOpentelemetry', 'opentelemetry', 'devops', ['observability', 'tracing', 'metrics', 'logs'], []],
  ['siSnyk', 'snyk', 'devops', ['security', 'vulnerabilities', 'dependencies', 'scanning'], []],
  ['siCodecov', 'codecov', 'devops', ['coverage', 'testing', 'reports', 'ci'], []],
  ['siGitea', 'gitea', 'devops', ['git', 'hosting', 'self-hosted', 'lightweight'], []],
  // Cloud
  ['siMinio', 'minio', 'cloud', ['storage', 's3-compatible', 'object', 'open-source'], []],
  ['siPortainer', 'portainer', 'cloud', ['container', 'management', 'docker', 'ui'], []],
  // AI/ML
  ['siKaggle', 'kaggle', 'ai-ml', ['competition', 'dataset', 'notebook', 'community'], []],
  ['siGradio', 'gradio', 'ai-ml', ['ui', 'ml-demo', 'interface', 'python'], []],
  ['siStreamlit', 'streamlit', 'ai-ml', ['dashboard', 'data-app', 'python', 'interactive'], []],
  ['siPolars', 'polars', 'ai-ml', ['dataframe', 'rust', 'fast', 'analytics'], []],
  ['siPlotly', 'plotly', 'ai-ml', ['visualization', 'interactive', 'charts', 'dash'], []],
  // Tools
  ['siGitkraken', 'gitkraken', 'tools', ['git', 'gui', 'client', 'merge'], []],
  ['siSourcetree', 'sourcetree', 'tools', ['git', 'gui', 'atlassian', 'client'], []],
  ['siHyper', 'hyper', 'tools', ['terminal', 'electron', 'extensible', 'cross-platform'], []],
  ['siAlacritty', 'alacritty', 'tools', ['terminal', 'gpu', 'fast', 'rust'], []],
  ['siStarship', 'starship', 'tools', ['prompt', 'shell', 'cross-shell', 'rust'], []],
  ['siBiome', 'biome', 'tools', ['linter', 'formatter', 'fast', 'rust'], []],
  ['siConfluence', 'confluence', 'tools', ['wiki', 'docs', 'atlassian', 'collaboration'], []],
  // Design
  ['siPenpot', 'penpot', 'design', ['design', 'open-source', 'prototyping', 'vector'], []],
  ['siGimp', 'gimp', 'design', ['image', 'editing', 'open-source', 'raster'], []],
  ['siInkscape', 'inkscape', 'design', ['vector', 'editing', 'open-source', 'svg'], []],
  ['siLottiefiles', 'lottiefiles', 'design', ['animation', 'json', 'motion', 'lightweight'], []],
  // Testing
  ['siK6', 'k6', 'testing', ['load-testing', 'performance', 'grafana', 'javascript'], []],
  // OS
  ['siNixos', 'nixos', 'os', ['operating-system', 'linux', 'reproducible', 'functional'], []],
  ['siKalilinux', 'kalilinux', 'os', ['operating-system', 'linux', 'security', 'pentesting'], []],
  ['siLinuxmint', 'linuxmint', 'os', ['operating-system', 'linux', 'cinnamon', 'beginner'], []],
  ['siManjaro', 'manjaro', 'os', ['operating-system', 'linux', 'arch-based', 'friendly'], []],
  ['siRedhat', 'redhat', 'os', ['operating-system', 'linux', 'enterprise', 'rpm'], []],
  ['siSuse', 'suse', 'os', ['operating-system', 'linux', 'enterprise', 'gecko'], []],
  ['siFreebsd', 'freebsd', 'os', ['operating-system', 'bsd', 'unix', 'server'], []],
  ['siTails', 'tails', 'os', ['operating-system', 'linux', 'privacy', 'tor'], []],
  // Crypto
  ['siCardano', 'cardano', 'crypto', ['cryptocurrency', 'blockchain', 'proof-of-stake', 'ada'], []],
  ['siPolkadot', 'polkadot', 'crypto', ['cryptocurrency', 'blockchain', 'parachain', 'dot'], []],
  ['siChainlink', 'chainlink', 'crypto', ['cryptocurrency', 'oracle', 'defi', 'link'], []],
  ['siMonero', 'monero', 'crypto', ['cryptocurrency', 'privacy', 'blockchain', 'xmr'], []],
  ['siLitecoin', 'litecoin', 'crypto', ['cryptocurrency', 'blockchain', 'payments', 'ltc'], []],
  ['siDogecoin', 'dogecoin', 'crypto', ['cryptocurrency', 'meme', 'blockchain', 'doge'], []],
  ['siOpensea', 'opensea', 'crypto', ['nft', 'marketplace', 'ethereum', 'web3'], []],
  ['siWeb3dotjs', 'web3dotjs', 'crypto', ['library', 'ethereum', 'javascript', 'dapps'], []],
  // Hardware
  ['siEspressif', 'espressif', 'hardware', ['esp32', 'iot', 'wifi', 'microcontroller'], []],
  // Gaming
  ['siOculus', 'oculus', 'gaming', ['vr', 'meta', 'headset', 'virtual-reality'], []],

  // ── Batch 4: 80+ more icons ──
  // Cloud & Hosting
  ['siWindsurf', 'windsurf', 'tools', ['ide', 'ai', 'code-editor', 'codeium'], []],
  ['siOvh', 'ovh', 'cloud', ['hosting', 'cloud', 'european', 'infrastructure'], []],
  ['siCoolify', 'coolify', 'cloud', ['hosting', 'self-hosted', 'paas', 'open-source'], []],
  ['siProxmox', 'proxmox', 'cloud', ['virtualization', 'server', 'hypervisor', 'kvm'], []],
  ['siUnraid', 'unraid', 'cloud', ['nas', 'server', 'storage', 'self-hosted'], []],
  ['siTruenas', 'truenas', 'cloud', ['nas', 'storage', 'zfs', 'server'], []],
  ['siTailscale', 'tailscale', 'cloud', ['vpn', 'mesh', 'network', 'wireguard'], []],
  ['siBackblaze', 'backblaze', 'cloud', ['storage', 'backup', 'b2', 'cloud'], []],
  // Databases & Search
  ['siClickhouse', 'clickhouse', 'databases', ['database', 'analytics', 'columnar', 'olap'], []],
  ['siTimescale', 'timescale', 'databases', ['database', 'time-series', 'postgresql', 'analytics'], ['timescaledb']],
  ['siNeon', 'neon', 'databases', ['database', 'serverless', 'postgresql', 'branching'], []],
  ['siSequelize', 'sequelize', 'databases', ['orm', 'nodejs', 'sql', 'database'], []],
  ['siTypeorm', 'typeorm', 'databases', ['orm', 'typescript', 'database', 'activerecord'], []],
  // AI & ML
  ['siPerplexity', 'perplexity', 'ai-ml', ['search', 'ai', 'assistant', 'llm'], []],
  ['siReplicate', 'replicate', 'ai-ml', ['ml', 'inference', 'api', 'models'], []],
  // DevOps & CI/CD
  ['siArgo', 'argo', 'devops', ['gitops', 'kubernetes', 'workflow', 'ci-cd'], []],
  ['siFlux', 'flux', 'devops', ['gitops', 'kubernetes', 'cd', 'cncf'], []],
  ['siCilium', 'cilium', 'devops', ['networking', 'kubernetes', 'ebpf', 'security'], []],
  ['siLinkerd', 'linkerd', 'devops', ['service-mesh', 'kubernetes', 'cncf', 'proxy'], []],
  ['siBuildkite', 'buildkite', 'devops', ['ci', 'cd', 'pipeline', 'hybrid'], []],
  ['siDrone', 'drone', 'devops', ['ci', 'cd', 'container', 'pipeline'], []],
  ['siTeamcity', 'teamcity', 'devops', ['ci', 'cd', 'jetbrains', 'enterprise'], []],
  ['siHashicorp', 'hashicorp', 'devops', ['infrastructure', 'cloud', 'automation', 'iac'], []],
  // Security
  ['siWireguard', 'wireguard', 'devops', ['vpn', 'networking', 'encryption', 'tunnel'], []],
  ['siOwasp', 'owasp', 'devops', ['security', 'web', 'vulnerabilities', 'standards'], []],
  ['siKeycloak', 'keycloak', 'devops', ['auth', 'identity', 'sso', 'open-source'], []],
  ['siHackerone', 'hackerone', 'devops', ['security', 'bounty', 'pentesting', 'vulnerability'], []],
  ['siBugcrowd', 'bugcrowd', 'devops', ['security', 'bounty', 'crowdsourced', 'testing'], []],
  ['siCheckmarx', 'checkmarx', 'devops', ['security', 'sast', 'code-scanning', 'appsec'], []],
  ['siAqua', 'aqua', 'devops', ['security', 'container', 'cloud-native', 'scanning'], ['aquasec']],
  // Tools & Editors
  ['siGnuemacs', 'emacs', 'tools', ['editor', 'lisp', 'extensible', 'gnu'], ['gnu-emacs']],
  ['siCodesandbox', 'codesandbox', 'tools', ['cloud-ide', 'sandbox', 'browser', 'development'], []],
  ['siGlitch', 'glitch', 'tools', ['cloud-ide', 'remix', 'community', 'hosting'], []],
  ['siBeekeeperstudio', 'beekeeperstudio', 'tools', ['database', 'gui', 'sql', 'cross-platform'], []],
  ['siDbeaver', 'dbeaver', 'tools', ['database', 'gui', 'sql', 'universal'], []],
  // Monitoring & Testing
  ['siRollbar', 'rollbar', 'tools', ['error-tracking', 'monitoring', 'debugging', 'alerts'], []],
  ['siSaucelabs', 'saucelabs', 'testing', ['testing', 'cross-browser', 'automation', 'cloud'], ['sauce-labs']],
  ['siChromatic', 'chromatic', 'testing', ['testing', 'visual', 'storybook', 'ui'], []],
  ['siLighthouse', 'lighthouse', 'testing', ['performance', 'audit', 'google', 'web'], []],
  ['siPagespeedinsights', 'pagespeedinsights', 'testing', ['performance', 'google', 'web', 'optimization'], []],
  ['siSpeedtest', 'speedtest', 'tools', ['network', 'speed', 'bandwidth', 'testing'], []],
  ['siAppium', 'appium', 'testing', ['testing', 'mobile', 'automation', 'cross-platform'], []],
  // Messaging & Communication
  ['siMatrix', 'matrix', 'social', ['messaging', 'decentralized', 'federation', 'open-source'], []],
  ['siElement', 'element', 'social', ['messaging', 'matrix', 'encrypted', 'collaboration'], []],
  ['siMattermost', 'mattermost', 'social', ['messaging', 'team', 'open-source', 'slack-alt'], []],
  ['siZulip', 'zulip', 'social', ['messaging', 'threaded', 'open-source', 'team'], []],
  ['siSignal', 'signal', 'social', ['messaging', 'encrypted', 'privacy', 'mobile'], []],
  ['siViber', 'viber', 'social', ['messaging', 'calls', 'mobile', 'voip'], []],
  ['siKick', 'kick', 'social', ['streaming', 'live', 'gaming', 'video'], []],
  ['siLemmy', 'lemmy', 'social', ['forum', 'reddit-alt', 'fediverse', 'open-source'], []],
  ['siPixelfed', 'pixelfed', 'social', ['photos', 'instagram-alt', 'fediverse', 'open-source'], []],
  // CMS & Content
  ['siKeystone', 'keystone', 'backend', ['cms', 'headless', 'graphql', 'nodejs'], []],
  ['siMintlify', 'mintlify', 'tools', ['docs', 'documentation', 'api', 'modern'], []],
  ['siGhost', 'ghost', 'backend', ['cms', 'blogging', 'publishing', 'nodejs'], []],
  // Static site generators
  ['siHugo', 'hugo', 'frontend', ['ssg', 'static', 'go', 'fast'], []],
  ['siJekyll', 'jekyll', 'frontend', ['ssg', 'static', 'ruby', 'github-pages'], []],
  ['siHexo', 'hexo', 'frontend', ['ssg', 'static', 'nodejs', 'blog'], []],
  // Payment
  ['siAdyen', 'adyen', 'brands', ['payment', 'fintech', 'commerce', 'processing'], []],
  ['siSquare', 'square', 'brands', ['payment', 'fintech', 'pos', 'processing'], []],
  // Build tools
  ['siAxios', 'axios', 'frontend', ['http', 'client', 'promise', 'requests'], []],
  ['siN8n', 'n8n', 'tools', ['automation', 'workflow', 'integration', 'open-source'], []],
  ['siMake', 'make', 'tools', ['automation', 'workflow', 'integration', 'no-code'], ['integromat']],
  // Analytics
  ['siPosthog', 'posthog', 'tools', ['analytics', 'product', 'open-source', 'tracking'], []],
  // Design
  ['siExcalidraw', 'excalidraw', 'design', ['whiteboard', 'drawing', 'collaboration', 'open-source'], []],
  ['siMermaid', 'mermaid', 'design', ['diagrams', 'charts', 'markdown', 'visualization'], []],
  ['siRive', 'rive', 'design', ['animation', 'interactive', 'runtime', 'motion'], []],
  ['siKrita', 'krita', 'design', ['painting', 'digital-art', 'open-source', 'raster'], []],
  // Networking
  ['siOpenwrt', 'openwrt', 'os', ['router', 'firmware', 'networking', 'open-source'], []],
  // Home automation
  ['siHomeassistant', 'homeassistant', 'tools', ['iot', 'home', 'automation', 'open-source'], ['hass']],
  ['siNodered', 'nodered', 'tools', ['iot', 'flow', 'automation', 'low-code'], ['node-red']],
  // Media
  ['siEmby', 'emby', 'tools', ['media', 'server', 'streaming', 'self-hosted'], []],
  ['siJellyfin', 'jellyfin', 'tools', ['media', 'server', 'streaming', 'open-source'], []],
  ['siPlex', 'plex', 'tools', ['media', 'server', 'streaming', 'self-hosted'], []],
  ['siFfmpeg', 'ffmpeg', 'tools', ['video', 'audio', 'encoding', 'multimedia'], []],
  // Misc
  ['siConventionalcommits', 'conventionalcommits', 'tools', ['git', 'commits', 'convention', 'semver'], []],
  ['siSemver', 'semver', 'tools', ['versioning', 'semantic', 'convention', 'release'], []],
  ['siRss', 'rss', 'misc', ['feed', 'syndication', 'xml', 'news'], []],
  ['siXml', 'xml', 'misc', ['markup', 'data', 'format', 'web'], []],
  ['siLatex', 'latex', 'misc', ['typesetting', 'academic', 'publishing', 'documents'], ['tex']],
  // Music
  ['siDeezer', 'deezer', 'social', ['music', 'streaming', 'audio', 'playlists'], []],
  ['siTidal', 'tidal', 'social', ['music', 'streaming', 'hifi', 'audio'], []],
  // Browsers
  ['siKickstarter', 'kickstarter', 'brands', ['crowdfunding', 'creative', 'projects', 'funding'], []],
];

function extractInner(svg: string): string {
  return svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').replace(/<title>[^<]*<\/title>/, '').trim();
}

function buildSvg(inner: string, color: string): string {
  // Use currentColor so the React component's fill prop works for color overrides
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <g transform="translate(8, 8) scale(4.667)" fill="${color}">
    ${inner}
  </g>
</svg>`;
}

function buildSvgCurrentColor(inner: string): string {
  // Uses currentColor — the React wrapper sets the actual fill color
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <g transform="translate(8, 8) scale(4.667)" fill="currentColor">
    ${inner}
  </g>
</svg>`;
}

function run() {
  const si = require('simple-icons');
  const registry: any[] = [];
  let found = 0;
  let notFound = 0;

  for (const [siKey, slug, category, tags, aliases] of ICON_DEFS) {
    const icon = si[siKey];
    if (!icon) {
      console.warn(`⚠ Not found: ${siKey} → ${slug}`);
      notFound++;
      continue;
    }

    const outDir = path.join(ICONS_DIR, category, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const inner = extractInner(icon.svg);
    const brandColor = `#${icon.hex}`;

    // Default uses currentColor so the React color prop works
    fs.writeFileSync(path.join(outDir, 'default.svg'), buildSvgCurrentColor(inner));

    const hex = icon.hex;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b); // perceived brightness 0-255
    const isDark = luminance < 60;
    const isVeryLight = r > 240 && g > 240 && b > 240; // only near-white like #FFFFFF
    const variants: string[] = ['default'];

    // Light variant (white) for dark-colored icons — visible on dark backgrounds
    if (isDark) {
      fs.writeFileSync(path.join(outDir, 'light.svg'), buildSvg(inner, '#f8fafc'));
      variants.push('light');
    }

    // Dark variant for very light/white icons — visible on light backgrounds
    if (isVeryLight) {
      fs.writeFileSync(path.join(outDir, 'dark.svg'), buildSvg(inner, '#0f172a'));
      variants.push('dark');
    }

    registry.push({
      slug,
      name: icon.title,
      category,
      tags,
      aliases,
      variants,
      hex: icon.hex,
      url: icon.source || '',
    });

    found++;
  }

  // Sort registry alphabetically by name
  registry.sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(DATA_FILE, JSON.stringify(registry, null, 2) + '\n');
  console.log(`\n✅ ${found} icons fetched, ${notFound} not found`);
  console.log(`📦 Registry written with ${registry.length} entries`);
}

run();
