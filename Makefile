PROJECT=thawed-weasel
VERSION=1.0

XPI=$(PROJECT)-$(VERSION).xpi

all: dist

dist: $(XPI)

install.rdf: install.rdf.in
	sed -e 's/@VERSION@/$(VERSION)/' $< > $@

$(XPI): install.rdf bootstrap.js
	zip -r "$(XPI)" $^

install: $(XPI)
	iceweasel $(XPI)

clean:
	rm -f install.rdf $(XPI)

.PHONY: dist clean install
