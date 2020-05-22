describe('Duplicate signups tests', () => {
  let duplicateSignupsCheck;
  beforeEach(function () {
    duplicateSignupsCheck = new TP.module.duplicateSignupsCheck();
    let mainElement = document.createElement('div');
    mainElement.id = 'duplicateSignupsCheckSubmit';
    duplicateSignupsCheck.elements.mainElement = $(mainElement);
    let message = document.createElement('textarea');
    message.id = 'duplicateSignupsCheckMessage';
    duplicateSignupsCheck.elements.message = $(message);
    let button = document.createElement('button');
    button.id = 'duplicateSignupsCheckSubmit';
    duplicateSignupsCheck.elements.submitButton = $(button);
    duplicateSignupsCheck.elements.signMeUpButton = $('<button>', {
      id: 'submitSignupInfo',
    });
    // jquery version of create element
    duplicateSignupsCheck.elements.closeButton = $('<button>', {
      id: 'duplicateSignupsCheckClose',
    });
    let counter = document.createElement('div');
    counter.id = 'charactersRemaining';
    duplicateSignupsCheck.elements.counter = $(counter);

    duplicateSignupsCheck.elements.hiddenId = $('<input>', {
      value: '12345',
    });
  });
  describe('Duplicate signups init tests', () => {
    it('should call render on init', () => {
      spyOn(duplicateSignupsCheck, 'render');
      duplicateSignupsCheck.init();
      expect(duplicateSignupsCheck.render).toHaveBeenCalled();
    });

    it('should disable submit button on init', () => {
      duplicateSignupsCheck.init();
      expect(
        duplicateSignupsCheck.elements.submitButton.prop('disabled')
      ).toBeTruthy();
      expect(
        duplicateSignupsCheck.elements.submitButton.hasClass(
          'creditCheckPopup__button_disabled'
        )
      ).toBeTruthy();
    });

    it('should call attach event listeners on init', () => {
      spyOn(duplicateSignupsCheck, 'attachEventListeners');
      duplicateSignupsCheck.init();
      expect(duplicateSignupsCheck.attachEventListeners).toHaveBeenCalled();
    });
  });

  describe('Duplicate signups event listener tests', () => {
    beforeEach(function () {
      duplicateSignupsCheck.init();
    });

    it('should call checkDuplicateSignup on sign me up button click', () => {
      spyOn(duplicateSignupsCheck, 'checkDuplicateSignup');
      duplicateSignupsCheck.elements.signMeUpButton.trigger('click');
      expect(duplicateSignupsCheck.checkDuplicateSignup).toHaveBeenCalled();
    });

    it('should disable the submit button on empty message text', () => {
      duplicateSignupsCheck.elements.message.val('');
      duplicateSignupsCheck.enableDisableSubmitOnEmptyMessage(
        duplicateSignupsCheck.elements.message.val()
      );
      expect(
        duplicateSignupsCheck.elements.submitButton.prop('disabled')
      ).toBeTruthy();
      expect(
        duplicateSignupsCheck.elements.submitButton.hasClass(
          'creditCheckPopup__button_disabled'
        )
      ).toBeTruthy();
    });

    it('should enable the submit button on message with text', () => {
      duplicateSignupsCheck.elements.message.val('some text');
      duplicateSignupsCheck.enableDisableSubmitOnEmptyMessage(
        duplicateSignupsCheck.elements.message.val()
      );
      expect(
        duplicateSignupsCheck.elements.submitButton.prop('disabled')
      ).toBeFalsy();
      expect(
        duplicateSignupsCheck.elements.submitButton.hasClass(
          'creditCheckPopup__button_disabled'
        )
      ).toBeFalsy();
    });

    it('should update counter text with message text length', () => {
      duplicateSignupsCheck.elements.message.val('test counter');
      duplicateSignupsCheck.updateCounter();
      expect(duplicateSignupsCheck.elements.counter.text()).toEqual(
        '12/2000 characters'
      );
    });

    it('should call updateCounter on message keyup', () => {
      spyOn(duplicateSignupsCheck, 'updateCounter');
      duplicateSignupsCheck.elements.message.val('test counter');
      duplicateSignupsCheck.elements.message.trigger('keyup');
      expect(duplicateSignupsCheck.updateCounter).toHaveBeenCalled();
    });

    it('should call enableDisableSubmitOnEmptyMessage on message keyup', () => {
      spyOn(duplicateSignupsCheck, 'enableDisableSubmitOnEmptyMessage');
      duplicateSignupsCheck.elements.message.val('test');
      duplicateSignupsCheck.elements.message.trigger('keyup');
      expect(
        duplicateSignupsCheck.enableDisableSubmitOnEmptyMessage
      ).toHaveBeenCalled();
    });

    it('should call closeModal on close button click', () => {
      spyOn(duplicateSignupsCheck, 'closeModal');
      duplicateSignupsCheck.elements.closeButton.trigger('click');
      expect(duplicateSignupsCheck.closeModal).toHaveBeenCalled();
    });
  });

  describe('Duplicate signups ajax calls tests', () => {
    beforeEach(function () {
      duplicateSignupsCheck.init();
    });

    it('should make ajax call to check if duplicate on init', function () {
      spyOn($, 'ajax').and.callFake(function (options) {
        var result = { Result: true },
          status,
          xhr;
        options.success(result, status, xhr);
      });
      spyOn(duplicateSignupsCheck, 'showDuplicateSignupForm');
      duplicateSignupsCheck.checkDuplicateSignup();
      expect(duplicateSignupsCheck.showDuplicateSignupForm).toHaveBeenCalled();
      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual(
        '/api/signup/acquired?signupId=12345'
      );
    });

    it('should make ajax call on submit form', function () {
      spyOn($, 'ajax').and.callFake(function (options) {
        var result = { text: 'this a a fake response' },
          status,
          xhr;
        options.success(result, status, xhr);
      });
      spyOn(duplicateSignupsCheck, 'submitSuccess');
      duplicateSignupsCheck.submitDuplicateSignupForm();
      expect(duplicateSignupsCheck.submitSuccess).toHaveBeenCalledWith({
        text: 'this a a fake response',
      });
      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual(
        '/api/signup/duplicate?signupId=12345'
      );
    });
  });
});
