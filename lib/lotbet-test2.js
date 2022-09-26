'use babel';

import LotbetTest2View from './lotbet-test2-view';
import { CompositeDisposable } from 'atom';

export default {

  lotbetTest2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lotbetTest2View = new LotbetTest2View(state.lotbetTest2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lotbetTest2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lotbet-test2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lotbetTest2View.destroy();
  },

  serialize() {
    return {
      lotbetTest2ViewState: this.lotbetTest2View.serialize()
    };
  },

  toggle() {
    console.log('LotbetTest2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
