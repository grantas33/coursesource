<?php


class BrowseCoursesBoxCest
{
    /**
     * @param AcceptanceTester $I user
     * @throws Exception
     */
    public function browseCourses(AcceptanceTester $I)
    {
        $I->am("Student guest");
        $I->amOnPage('/');
        $I->wait(3);
        $I->see('Courses');
        $I->click('a[href="/main/browse-courses"]');
        $I->waitForElement('.input-sm');
        $I->amRedirectedTo('/main/browse-courses');
        $I->dontSee('Error');
        $I->canSee('Browse courses');
    }
}
