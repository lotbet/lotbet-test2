'use babel';

import LotbetTest2 from '../lib/lotbet-test2';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LotbetTest2', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('lotbet-test2');
  });

  describe('when the lotbet-test2:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.lotbet-test2')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'lotbet-test2:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.lotbet-test2')).toExist();

        let lotbetTest2Element = workspaceElement.querySelector('.lotbet-test2');
        expect(lotbetTest2Element).toExist();

        let lotbetTest2Panel = atom.workspace.panelForItem(lotbetTest2Element);
        expect(lotbetTest2Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'lotbet-test2:toggle');
        expect(lotbetTest2Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.lotbet-test2')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'lotbet-test2:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let lotbetTest2Element = workspaceElement.querySelector('.lotbet-test2');
        expect(lotbetTest2Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'lotbet-test2:toggle');
        expect(lotbetTest2Element).not.toBeVisible();
      });
    });
  });
});
