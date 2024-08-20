describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,';
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('larissa@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0  })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação incorreta', () => {
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('larissa@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
        .type('ABCDEFGIJK')
        .should('have.value', '')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('larissa@exemplo.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
        .type('Larissa')
        .should('have.value', 'Larissa')
        .clear()
        .should('have.value', '')
    cy.get('#lastName')
        .type('Rodrigues')
        .should('have.value', 'Rodrigues')
        .clear()
        .should('have.value', '')
    cy.get('#email')
        .type('larissa@exemplo.com')
        .should('have.value', 'larissa@exemplo.com')
        .clear()
        .should('have.value', '')
    cy.get('#phone')
        .type('12345678')
        .should('have.value', '12345678')
        .clear()
        .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) pelo seu índice', () => {
    cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback" ', () => {
    cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
  });

  it('marca ambos os checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input) => {
          expect($input[0].files[0].name).to.equal('example.json')
        })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('verifica a página de política de privacidade removendo o target e então clicando no link ', () => {
    cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

    cy.contains('Talking About Testing').should('be.visible')
  });

})