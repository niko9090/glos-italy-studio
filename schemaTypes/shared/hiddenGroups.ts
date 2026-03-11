// Configurazione gruppi nascosti per sezioni semplificate
// Questi gruppi contengono opzioni di stile che l'utente finale non deve modificare

export const hiddenStyleGroups = ['style', 'effects', 'advanced', 'typography', 'animation', 'spacing']

// Helper per creare campi nascosti
export const hideFieldInGroup = (groups: string[]) => ({
  hidden: ({ document }: any) => {
    // Nascondi sempre i campi nei gruppi di stile
    return true
  }
})

// Lista dei gruppi che devono essere visibili all'utente
export const visibleGroups = ['content', 'buttons', 'media', 'info', 'pricing', 'settings', 'comments', 'video']
