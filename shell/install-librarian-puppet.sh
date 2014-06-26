#!/bin/sh

# Directory in which librarian-puppet should manage its modules directory
PUPPET_DIR=/etc/puppet/

# NB: librarian-puppet might need git installed. If it is not already installed
# in your basebox, this will manually install it at this point using apt or yum

$(which librarian-puppet > /dev/null 2>&1)
FOUND_LIBRARIAN_PUPPET=$?
if [ "$FOUND_LIBRARIAN_PUPPET" -ne '0' ]; then
  echo 'Attempting to install librarian-puppet'
  $(which apt-get > /dev/null 2>&1)
  FOUND_APT=$?

  if [ "${FOUND_APT}" -eq '0' ]; then
    apt-get -q -y update
    apt-get -q -y install librarian-puppet
    echo 'librarian-puppet installed.'
  else
    echo 'No package installer available. You may need to install librarian-puppet manually.'
  fi
else
  echo 'librarian-puppet found.'
fi

if [ ! -d "$PUPPET_DIR" ]; then
  mkdir -p $PUPPET_DIR
fi
cp /vagrant/puppet/Puppetfile $PUPPET_DIR

cd $PUPPET_DIR && librarian-puppet update
