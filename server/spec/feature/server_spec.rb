require 'capybara/rspec'

describe "Listen page", type: :feature do
  xit "returns HTTP status 200" do
    visit '/listen'

    expect(page.status_code).to eq(200)
  end

  xit "has a title" do
    visit '/listen'

    expect(page).to have_title 'Kirill'
  end

  xit "has a button to turn on the output" do
    visit '/listen'

    within "#power-on" do
      expect(page).to have_button("power-on-button")
    end
  end
end