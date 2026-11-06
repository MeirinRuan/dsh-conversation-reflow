/** Scoped layout corrections, removed with the shell overlay registration. */
window.__ModuleLoader__.load({
  id: 'dsh-conversation-reflow',
  factory(require) {
    const React = require('react');
    const css = `
      [data-slot="main.conversation"] [data-conversation-content] {
        min-width: 0;
        --dsh-chat-content-width: min(
          var(--dsh-chat-user-width, clamp(680px, calc(var(--dsh-conversation-column-width, 100vw) * .64), 920px)),
          max(0px, calc(var(--dsh-conversation-column-width, 100vw) - 64px - var(--dsh-scrollbar-width, 5px) - 2px))
        ) !important;
      }
      [data-slot="main.conversation"] [data-conversation-scroll],
      [data-slot="main.conversation"] [data-slot="conversation.session"],
      [data-slot="main.conversation"] [data-slot="conversation.view"],
      [data-slot="main.conversation"] [data-slot="conversation.chat.flow"] {
        min-width: 0;
        max-width: 100%;
      }
      [data-slot="main.conversation"] [data-chat-flow] {
        min-width: 0;
        max-width: 100%;
        overflow-wrap: anywhere;
      }
      [data-slot="main.conversation"] [data-chat-flow] :is(th, td) {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      [data-slot="main.conversation"] [data-chat-flow] table {
        width: 100%;
        max-width: 100%;
      }
      [data-slot="main.conversation"] [data-conversation-scroll] .md-table-wide {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        margin-inline: 0;
        padding-inline: 0;
        overflow-x: auto;
      }
    `;
    function ReflowStyles() {
      return React.createElement('style', { 'data-plugin': 'dsh-conversation-reflow' }, css);
    }
    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'conversation-reflow',
        }, ReflowStyles));
      },
    };
  },
});
