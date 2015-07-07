PROJECT=thawed-weasel
VERSION=1.0

all: dist

install.rdf: install.rdf.in
	sed -e 's/@VERSION@/$(VERSION)/' $< > $@

dist: install.rdf bootstrap.js
	zip -r "$(PROJECT)-$(VERSION).xpi" $^

clean:
	rm -f install.rdf

.PHONY: dist clean
