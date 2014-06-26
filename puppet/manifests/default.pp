$node_binaries_path = '/usr/local/node/node-default/bin'

Exec {
  path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin', '/usr/local/bin',
          'language-pack-UTF-8']
}

# --- Preinstall Stage ---#

stage { 'preinstall':
  before => Stage['main']
}

# Define the install_packages class
class install_packages {
  package { ['curl', 'build-essential', 'libfontconfig1', 'python',
             'g++', 'make', 'wget', 'tar', 'mc', 'htop']:
    ensure => present
  }
}

# Declare (invoke) install_packages
class { 'install_packages':
  stage => preinstall
}

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.29'
}

file { '/usr/bin/node':
  ensure => 'link',
  target => "${node_binaries_path}/node",
}


# --- MySQL --- #

class { '::mysql::server':
  root_password => 'foo'
}
