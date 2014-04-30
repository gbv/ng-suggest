describe("SeeAlso service", function() {

    beforeEach(function(){
        module('ngSuggest');
    });

    it('should contain an SeeAlso service',
        inject(function(SeeAlso) {
            var service = new SeeAlso("http://example.org/");
            expect(service.url).toEqual("http://example.org/?id={searchTerms}&format=seealso");
        })
    );
});
