export const GITHUB_USERNAME = 'daren046'

/** URLs des demos live — surchargeables via .env */
export const LIVE_URLS = {
  Portfolio: import.meta.env.VITE_PORTFOLIO_LIVE_URL || 'https://daren046.github.io/Portfolio/',
  BooqIn: import.meta.env.VITE_BOOQIN_LIVE_URL || null,
  Gitclout: import.meta.env.VITE_GITCLOUT_LIVE_URL || null,
}

export const GRID_SIZES = {
  large: 'col-span-12 md:col-span-8 row-span-2',
  tall: 'col-span-12 md:col-span-4 row-span-2',
  wide: 'col-span-12 md:col-span-8 row-span-1',
  medium: 'col-span-12 md:col-span-6 row-span-1',
  small: 'col-span-12 md:col-span-4 row-span-1',
}

export const projectImages = {
  BooqIn:
    'https://images.unsplash.com/photo-1551882547-ff40c63fe906?w=1200&h=800&fit=crop&q=80',
  Gitclout:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
  Portfolio:
    'https://images.unsplash.com/photo-1550745166-9bc0b252726f?w=800&h=600&fit=crop&q=80',
}

export const categoryFallbackImages = {
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
  backend: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
  academic: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80',
}

export const projectMeta = {
  BooqIn: {
    category: 'backend',
    displayOrder: 1,
    gridSize: 'large',
    liveUrl: LIVE_URLS.BooqIn,
    description:
      'Application de réservation full stack — API Spring Boot 3.4 (Java 21, JWT, Spring Security, JPA/H2) avec frontend React 19, TypeScript et Tailwind CSS 4.',
    shortDescription:
      'Réservation full stack — Spring Boot 3.4, React 19, TypeScript et Tailwind CSS 4.',
    technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'Tailwind CSS', 'H2', 'JWT'],
    image: projectImages.BooqIn,
    imagePosition: 'center center',
    featured: true,
    caseStudy: {
      subtitle: 'Application de réservation — projet full stack',
      sections: {
        problem:
          'Concevoir une application de réservation complète : gestion des créneaux, des utilisateurs et des bookings, avec une API sécurisée et une interface web moderne pour parcourir et réserver.',
        stack:
          'Backend Java 21 avec Spring Boot 3.4, Spring Security et JWT pour l\'authentification, Spring Data JPA et H2 pour la persistence. Frontend React 19, TypeScript, Tailwind CSS 4 et Vite, consommant l\'API REST via Axios.',
        role:
          'Conception de l\'API REST et des entités JPA, mise en place de l\'auth JWT, endpoints CRUD pour les réservations, puis développement du frontend : routing, formulaires, consommation de l\'API et interface responsive.',
        result:
          'Application full stack fonctionnelle, code open source sur GitHub, architecture claire séparant API et frontend. Base solide pour brancher une base PostgreSQL et déployer en production.',
      },
    },
  },
  Gitclout: {
    category: 'academic',
    displayOrder: 3,
    gridSize: 'tall',
    liveUrl: LIVE_URLS.Gitclout,
    description:
      'Analyse de dépôts Git — application Java 21 avec Micronaut, JGit, JPA/H2 et interface web TypeScript. Projet Master Université Gustave Eiffel.',
    shortDescription:
      'Analyse Git avec Micronaut, JGit et interface TypeScript — Master UGE.',
    technologies: ['Java 21', 'Micronaut', 'JGit', 'H2', 'TypeScript', 'Maven'],
    image: projectImages.Gitclout,
    featured: true,
    caseStudy: {
      subtitle: 'Analyse de dépôts Git — projet Master UGE',
      sections: {
        problem:
          'Analyser l\'activité et la structure de dépôts Git : commits, branches, contributeurs et métriques, via une application Java avec interface web consultable.',
        stack:
          'Backend Java 21 avec Micronaut (HTTP Netty, JPA, OpenAPI), JGit pour interroger les repos Git, base H2 embarquée. Frontend web TypeScript intégré au build Maven via frontend-maven-plugin.',
        role:
          'Modélisation des données d\'analyse, services Micronaut exposant les métriques Git, intégration JGit pour cloner et parser les dépôts, puis interface web pour visualiser les résultats et la documentation utilisateur.',
        result:
          'Application jar exécutable livrée dans le cadre du Master, avec doc technique PDF et parcours utilisateur via l\'interface web. Démonstration de stack Java moderne hors Spring.',
      },
    },
  },
  Portfolio: {
    category: 'web',
    displayOrder: 2,
    gridSize: 'wide',
    liveUrl: LIVE_URLS.Portfolio,
    description:
      'Ce portfolio — site vitrine React avec Tailwind CSS, Framer Motion, Vite et design responsive cinématique.',
    shortDescription:
      'Portfolio React, Tailwind CSS, Framer Motion et Vite — design cinématique.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    image: projectImages.Portfolio,
    featured: true,
    caseStudy: {
      subtitle: 'Site vitrine développeur — design cinématique',
      sections: {
        problem:
          'Présenter mon profil, mes compétences et mes projets de façon claire et mémorable pour recruteurs et clients, avec un site rapide, responsive et facile à maintenir.',
        stack:
          'React 18, Vite, Tailwind CSS, Framer Motion pour les animations, react-intersection-observer pour le scroll. Données projets enrichies localement + API GitHub. Déploiement GitHub Pages.',
        role:
          'Conception UI/UX (sections Hero, About, Skills, Projects, Experience, Contact), composants réutilisables, chargement dynamique des repos GitHub, formulaire de contact Web3Forms, case studies et pipeline CI/CD.',
        result:
          'Portfolio en ligne, open source, cohérent avec ma stack front et mon positionnement Java FullStack. Base extensible pour ajouter demos live et nouveaux projets.',
      },
    },
  },
}

export function categorizeRepo(name, language) {
  if (projectMeta[name]?.category) return projectMeta[name].category
  if (language === 'Java') return 'backend'
  if (language === 'JavaScript' || language === 'TypeScript') return 'web'
  return 'web'
}

export function buildProjectFromRepo(repo) {
  const meta = projectMeta[repo.name] ?? {}
  const category = meta.category ?? categorizeRepo(repo.name, repo.language)
  const description = meta.description ?? repo.description ?? `Projet open source — ${repo.language ?? 'multi-stack'}.`

  return {
    id: repo.id,
    title: repo.name,
    category,
    description,
    shortDescription: meta.shortDescription ?? description,
    image: meta.image ?? projectImages[repo.name] ?? categoryFallbackImages[category] ?? categoryFallbackImages.web,
    imagePosition: meta.imagePosition ?? 'center center',
    gridSize: meta.gridSize ?? 'medium',
    displayOrder: meta.displayOrder ?? 99,
    technologies: meta.technologies ?? (repo.language ? [repo.language] : []),
    liveUrl: meta.liveUrl ?? (repo.homepage || null),
    githubUrl: repo.html_url,
    caseStudy: meta.caseStudy ?? null,
    featured: meta.featured ?? false,
    updatedAt: repo.updated_at,
  }
}

export function sortProjects(projects) {
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder)
}
